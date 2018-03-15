import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookshelfChanger from './BookshelfChanger'

class Bookshelf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => {
                  return (
                    <li key={book.title}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : ''})` 
                          }}></div>
                          <BookshelfChanger
                            book={book}
                            moveBook={this.props.moveBook}
                          />
                        </div>
                        {book.title && <div className="book-title">{book.title}</div>}
                        {book.authors && <div className="book-authors">{book.authors.join(', ')}</div>}
                      </div>
                    </li>
                  )
                })}
          </ol>
        </div>
      </div>
    )
  }
}
Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  moveBook: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default Bookshelf