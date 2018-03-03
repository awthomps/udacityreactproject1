import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  // Initialize the state with the books from the server
  componentDidMount() {
    this.setBookStateFromServer();
  }

  // Helper method to set state with books from the server
  setBookStateFromServer() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({books: allBooks})
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
        <Route exact path='/' render={()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf
                title="Currently Reading"
                moveBook={this.moveBook}
                books={this.state.books.filter((book) => {return book.shelf === 'currentlyReading'})}
              />
              <Bookshelf
                title="Want to Read"
                moveBook={this.moveBook}
                books={this.state.books.filter((book) => {return book.shelf ==='wantToRead'})}
              />
              <Bookshelf
                title="Read"
                moveBook={this.moveBook}
                books={this.state.books.filter((book) => {return book.shelf === 'read'})}
              />
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }

  // Bound method which when called moves a book to another shelf and then
  // updates the state with the newly altered server data
  moveBook = (id, value) => {
    BooksAPI.get(id).then((book) => 
      BooksAPI.update(book, value).catch(() => {
        console.log('Problem changing book destination');
      }).then(() => {
        BooksAPI.getAll().then((allBooks) => {
          this.setState({books: allBooks})
        });
      })
    ).catch(
      console.log('Problem getting book with id: ' + id)
    );
  }
}

export default BooksApp
