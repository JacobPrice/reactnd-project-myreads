import React from 'react'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'

class Search extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link onClick={this.props.getBooks} to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={ (e) => this.props.searchBooks(e.target.value) } placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">

          <ListBooks updateShelf={this.props.updateShelf} books={this.props.books}/>
          
        </div>
      </div>
    )
  }
}

export default Search
