import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

class Bookshelf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  // Bound method used to call the moveBook method assigned as a prop
  moveBookToList = (event) => {
    if(this.props.moveBook) {
      this.props.moveBook(event.target.id, event.target.value);
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
                          <div className="book-shelf-changer">
                            <select defaultValue={book.shelf ? book.shelf : 'none'} id={book.id} onChange={this.moveBookToList}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read" >Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        {book.title && <div className="book-title">{book.title}</div>}
                        {book.authors && <div className="book-authors">{book.authors}</div>}
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