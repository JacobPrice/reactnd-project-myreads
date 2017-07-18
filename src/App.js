import React from 'react'
import {getAll, update, search} from './BooksAPI'
import './App.css'
import BookShelves from './components/BookShelves'
import Search from './components/Search'

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
  // searchBooks = (e) => {
  //   search(e.target.value, 25).then((books) => {
  //     if() {
  //          this.setState({results: []});
  //          return;
  //        }
  //     if(!books.error)
  //   this.setState({searchBooks: books})
  //   })
  //   console.log(this.state.searchBooks)
  // }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage
          ? (
            <Search />
          )
          : (
            <BookShelves updateShelf={this.updateShelf} books={this.state.books}/>
          )}
      </div>
    )
  }
}

export default BooksApp
