import React from 'react'
import {getAll, update, search} from './BooksAPI'
import './App.css'
import BookShelves from './components/BookShelves'
import Search from './components/Search'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    searchBooks: []
  }
  componentDidMount() {
    getAll().then(books => this.setState({books}))
  }
  updateShelf = (curBook, shelf) => {
    update(curBook, shelf).then(() => this.setState(state => {
      return {
        books: state.books.map(book => {
          if (book.id === curBook.id) {
            book.shelf = shelf
          }
          return book
        }),
        searchBooks: state.searchBooks.map(book => {
          if (book.id === curBook.id) {
            book.shelf = shelf
          }
          return book
        })
      }
    }))
  }
getBooks = () => {
    getAll().then(books => this.setState({books}))
}
  searchBooks = (searchQuery) => {
    if (searchQuery === '') {
      this.setState({searchBooks: [] })
    } else {
      search(searchQuery).then(searchBooks => {
        console.log(searchQuery)
        if (searchBooks.error === 'empty query') {
          this.setState({searchBooks: [], noResults: true})
        } else {
          // Method to remove duplicate ID's from the api res
          function trim(arr, key) {
            let values = {}
            return arr.filter(function(item) {
              let val = item[key]
              let exists = values[val]
              values[val] = true
              return !exists
            })
          }
          this.setState({
            searchBooks: trim(searchBooks, 'id'),
            noResults: false
          })
        }
      })
    }
  }
  updateSearch = (search) => {
    this.setState({search})
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={props => (
          <Search
            searchBooks={this.searchBooks}
            updateSearch={this.updateSearch}
            books={this.state.searchBooks}
            updateShelf={this.updateShelf}
            getBooks={this.getBooks}
          />
        )} />
        <Route exact path='/' render={props => (
          <BookShelves
            updateShelf={this.updateShelf}
            books={this.state.books}
            getBooks={this.getBooks}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
