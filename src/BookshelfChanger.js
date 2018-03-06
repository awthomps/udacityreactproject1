import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

class BookshelfChanger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  // Bound method used to call the moveBook method assigned as a prop
  moveBookToList = (event) => {
    if(this.props.moveBook) {
      this.props.moveBook(this.props.book, event.target.value);
    }
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select defaultValue={this.props.book.shelf ? this.props.book.shelf : 'none'} id={this.props.book.id} onChange={this.moveBookToList}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read" >Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}
BookshelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired
}

export default BookshelfChanger