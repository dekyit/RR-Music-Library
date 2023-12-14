import './App.css';
import { useState, useRef, useEffect } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')
  let searchInput = useRef('')

  const handleSearch = (e, term) => {
    e.preventDefault()
    fetch(`https://itunes.apple.com/search?term=${term}`)
    .then(response => response.json())
    .then(resData => {
      if (resData.results.length > 0) {
        return setData(resData.results)
      } else {
        return setMessage('Not Found.')
      }
    })
    .catch(err => setMessage('An Error has Occurred!'))
  }

  
  // function toTitleCase(str) {
  //   return str.replace(
  //     /\w\S*/g,
  //     function(txt) {
  //       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //     }
  //   );
  // }

  // 

  // const handleSearch = (e, term) => {
  //   e.preventDefault()
  //   term = toTitleCase(term)
  //   setSearchTerm(term)
  //   return (<Redirect to="/" />)
  // }

  return (
    <div className="App">
    
      <Router>
        <Route exact path="/">
        <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
            <SearchBar />
        </SearchContext.Provider>
           {message}
        <DataContext.Provider value={data}>
            <Gallery />
        </DataContext.Provider>
  
        </Route>
        <Route path="/album/:id">
          <AlbumView />
        </Route>
        <Route path="/artist/:id">
          <ArtistView  />
        </Route>
      </Router>
    </div>
  );
}

export default App;