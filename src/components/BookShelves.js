import React, { Component } from 'react'
import ListBooks from './ListBooks'

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

class BookShelves extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    currentlyReading: props.books.filter((book) => {
      return book.shelf === 'currentlyReading'
    }),
    wantToRead: props.books.filter((book) => {
      return book.shelf === 'wantToRead'
    }),
    read: props.books.filter((book) => {
      return book.shelf === 'read'
    })
    }
  }
  render() {
    return (
      <div className="list-books-content">
        <div>
          <BookShelf updateShelf={this.props.updateShelf} shelf="Currently Reading" books={this.state.currentlyReading}/>
          <BookShelf updateShelf={this.props.updateShelf} shelf="Want to Read" books={this.state.wantToRead
          }/>
          <BookShelf updateShelf={this.props.updateShelf} shelf="Read" books={this.state.read}/>
        </div>
      </div>
    )
  }
}
export default BookShelves
