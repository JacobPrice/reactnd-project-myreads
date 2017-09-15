import React from 'react'
import {getAll, update, search} from './BooksAPI'
import './App.css'
import BookShelves from './components/BookShelves'
import Search from './components/Search'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
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
    getAll().then(books => this.setState({ books }))
    this.setState({ searchBooks: [] })
  }

  searchBooks = (searchQuery) => {
    if (searchQuery === '') {
      this.setState({ searchBooks: [] })
    } else {
      search(searchQuery).then(books => {
        if (books.error === 'empty query') {
          this.setState({ searchBooks: [] })
        } else {
          const searchResults = books.map(book => {
            const existingBook = this.state.books.find(b => b.id === book.id)
              book.shelf = existingBook ? existingBook.shelf : 'none'
            return book
          })
          this.setState({
            searchBooks: searchResults,
          })
        }
      })
    }
  }

  updateSearch = (search) => {
    this.setState({ search })
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
