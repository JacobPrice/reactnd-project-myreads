import React from 'react'
import PropTypes from 'prop-types'

const Selector = (props) => {
  return (
    <select
      value={props.value}
      onChange={e => {
        props.updateShelf(props.book, e.target.value)}}>
      <option value="none" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  )
}
Selector.propTypes = {
  value: PropTypes.string.isRequired,
  updateShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}
class ListBooks extends React.Component {
  render() {
    const books = this.props.books
    return (
      <ol className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book">
            <div className="book-top">
              <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}></div>
              <div className="book-shelf-changer">
                <Selector
                  book={book}
                  updateShelf={this.props.updateShelf}
                  value={book.shelf}/>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        ))}
      </ol>
    )
  }
}
ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}
export default ListBooks
