import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './components/BookShelves'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     // TODO: Create array for each Book type and house the state here. This will be able to be updated and used across both the search and the list page. The change method will need to be passed down to the selector component. Since these three will now contain their own array, be sure to update each and pass them down to the individual components in  BookShelves component. These will be prefiltered, so get rid of the filtering done there. 😃
    showSearchPage: false,
    books: []
  }
componentDidMount() {
  BooksAPI.getAll().then((books) => {
    this.setState({ books })
  })
}
updateShelf = (book, shelf) => {
  this.setState({shelf: shelf})
  if(shelf) {
    BooksAPI.update(book, shelf).then((books) => this.setState({books:books}))
  }
}
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelves updateShelf={this.updateShelf} books={this.state.books} />
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
