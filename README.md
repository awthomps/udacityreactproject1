# MyReads Project

## Introduction
MyReads is a simple webapp for managing a personal reading list. On the main page, it lists books in 3 different 'bookshelves': 'Currently Reading', 'Want to Read', and 'Read'. It provides the means to move books between 'shelves' and even search for more books to add to one of the shelves on a separate 'search' page.

## Installation
1. Open up a command window and navigate to the directory you wish to install MyReads on your machine (the command should be '*cd \<directory\>*' where *\<directory\>\* is your desired directory).
2. Run the command '*git clone https://github.com/awthomps/udacityreactproject1.git*' and after a moment, the project shall download and should say 'done.'
3. After the project has been 'cloned', change directories to the project file 'udacityreactproject1' by entering the following command in your command window: '*cd udacityreactproject1*'
4. Now you may proceed to start installing the necessary dependencies for the project. Please enter the following command to install: '*npm install*'. This may take some time.
5. Some 'WARN' messages may come up but they should be ok. The project should now be successfully installed.

## Running MyReads
1. To start the app, enter the following command in your command window: '*npm start*'
2. After a momment, your default browser should open up the MyReads app automatically. If it does not, open up a new internet browser window or tab and navigate to MyReads by entering '*localhost:3000*' in the url entry bar and press enter.
3. The main page of the MyReads app should now be displayed in your browser

## Basic Instructions
Users can move books between shelves on the main page or the search page by selecting the green circle with the down arrow on any of the images of the books displayed in the app. Selecting the green arrow of any books shows 4 different 'shelves' the book can be moved where 'None' is an options to remove it from the bookshelves displayed on the main page. To search for more books to add to a shelf, navigate to '*localhost:3000/search*' or select the green circle with the '+' on the bottom right of the main page. Users can return to the main page any time by pressing back in the browser or selecting the arrow pointing left on the top left of the search page. Select the text box at the top of the page that says 'Search by title or author' and begin typing a desired query. A 'Results' bookshelf will appear when a user begins typing. If any valid results exist, the 'Results' bookshelf will populate with books. The user can add books to their shelves the same way as on the main page of the app.
