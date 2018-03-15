import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    query: '',
    books: [],
    queryBooks: []
  }

  // Method to update the query in the state as well as search the service
  // using the specified query string.
  updateQuery = (query) => {
    console.log(query);
    if(!query) {
      query = '';
    }
    //Get all books to set which shelf each book is on
    BooksAPI.getAll().then((allBooks) => {
      this.setState({books: allBooks});
      BooksAPI.search(query.trim()).then((books) => {
        if(books.error) {
          console.log(books.error);
          this.setState({ queryBooks: []});
        } else {
          //set shelves for applicable books:
          for(var i = 0; i < books.length; ++i) {
            for(var j = 0; j < allBooks.length; ++j) {
              if(books[i].id === allBooks[j].id) {
                books[i].shelf = allBooks[j].shelf;
              }
            }
          }
          this.setState({ queryBooks: books});
        }
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));

    //set query state
    if(query || query.length === 0) {
      this.setState({query: query })
    }
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
    // streamline populating bookshelves on main page:
    const shelves = [{
        title: 'Currently Reading',
        id: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        id: 'wantToRead'
      },
      {
        title: 'Read',
        id: 'read'
      }
    ];
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
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {( this.state.query) &&
                  <div className="list-books-content">
                    <Bookshelf
                      title="Results"
                      moveBook={this.moveBook}
                      books={this.state.queryBooks}
                    />
                  </div>
                }
              </ol>
            </div>
          </div>
        )}/>
        <Route exact path='/' render={()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {shelves.map((shelf) => 
                <Bookshelf
                  key={shelf.id}
                  title={shelf.title}
                  moveBook={this.moveBook}
                  books={this.state.books.filter((book) => {return book.shelf === shelf.id})}
                />
              )}
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
  moveBook = (book, value) => {
    BooksAPI.update(book, value).catch((error) => {
      console.log('Problem changing book destination');
      console.log(error);
    }).then(() => {
      //make sure query gets updated when a book is moved to make sure
      //that it appears on the correct shelf in the query page:
      this.updateQuery(this.state.query);
    })
  }
}

export default BooksApp
