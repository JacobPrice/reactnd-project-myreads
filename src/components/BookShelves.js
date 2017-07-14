import React from 'react'
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf}</h2>
      <div className="bookshelf-books">
        <ListBooks updateShelf={props.updateShelf} books={props.books} />
      </div>
    </div>
  )
}
BookShelf.propTypes = {
  updateShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}
class BookShelves extends React.Component {
  render() {
    return (
      <div className="list-books-content">
        <div>
          <BookShelf
            updateShelf={this.props.updateShelf}
            shelf="Currently Reading"
            books={this.props.books.filter(book => book.shelf === 'currentlyReading') }/>
          <BookShelf
            updateShelf={this.props.updateShelf}
            shelf="Want to Read"
            books={this.props.books.filter(book => book.shelf === 'wantToRead') }/>
          <BookShelf
            updateShelf={this.props.updateShelf}
            shelf="Read"
            books={this.props.books.filter(book => book.shelf === 'read') }/>
        </div>
      </div>
    )
  }
}
BookShelves.propTypes = {
  updateShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string,
  books: PropTypes.array.isRequired
}
export default BookShelves
