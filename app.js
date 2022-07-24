//book constructor
function Book (title, author, isbn) {
   this.title = title
   this.author = author
   this.isbn = isbn

}

//UI constructor
function UI () {}

//Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector('#book-list')
  //Create tr element
  const row = document.createElement('tr')
  //Isert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a> </td>
  `

  //Append to the list 
  list.appendChild(row)
}

//show Alert
UI.prototype.showAlert = function (text, className) {
  //create div
  const div = document.createElement('div')
  //Add class name
  div.className = `alert ${className}`
  //add text
  div.appendChild(document.createTextNode(text))
  //Get parent
  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')
  //Insert alert
  container.insertBefore(div, form)

  //time out after 3 sec
  setTimeout(() => document.querySelector('.alert').remove(), 3000 )
}

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

//Clear fields
UI.prototype.cleareFields = function () {
  document.querySelector('#title').value = ''
  document.querySelector('#author').value = ''
  document.querySelector('#isbn').value = ''
}

//Event listener for adding book 
document.querySelector('#book-form').addEventListener('submit', function (e) {
  //Get form values
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  //Instantiate book
  const book = new Book (title, author, isbn)

  //Instantiate UI
  const ui = new UI()

  //Validate
  if (title === '' || author === '' || isbn === '') {
    //Error alert 
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    //Add book to list 
    ui.addBookToList(book)

    //show success
    ui.showAlert('The book added!', 'success')
  
    //Clear fields
    ui.cleareFields()
  }
   

  e.preventDefault();
})

// Event listener for delete
document.querySelector('#book-list').addEventListener('click', function (e) {
  //Instantiate UI
  const ui = new UI()

  ui.deleteBook(e.target)

  ui.showAlert('Book removed!', 'success')

  e.preventDefault();
})