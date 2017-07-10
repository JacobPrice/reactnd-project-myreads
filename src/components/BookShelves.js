import React, { Component } from 'react'
import ListBooks from './ListBooks'

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf}</h2>
      <div className="bookshelf-books">
        <ListBooks books={props.books} />
      </div>
    </div>
  )
}

class BookShelves extends React.Component {
  render() {
    const books = this.props.books
    return (
      <div className="list-books-content">
        <div>
          <BookShelf shelf="Currently Reading" books={books.filter((book) => {
            return book.shelf == 'currentlyReading'
          })}/>
          <BookShelf shelf="Want to Read" books={books.filter((book) => {
            return book.shelf == 'wantToRead'
          })}/>
          <BookShelf shelf="Read" books={books.filter((book) => {
            return book.shelf == 'read'
          })}/>
        </div>
      </div>
    )
  }
}
export default BookShelves
