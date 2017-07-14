import React from 'react'
import {getAll, update} from './BooksAPI'
import './App.css'
import BookShelves from './components/BookShelves'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
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
        })
      }
    }))
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage
          ? (
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          )
          : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <BookShelves updateShelf={this.updateShelf} books={this.state.books}/>
              <div className="open-search">
                <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
