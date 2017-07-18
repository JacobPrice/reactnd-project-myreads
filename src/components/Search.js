import React from 'react'
import ListBooks from './ListBooks'

class Search extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search">Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          {/* <ListBooks /> */}
        </div>
      </div>
    )
  }
}

export default Search
