let library = [];

const temp = document.querySelector('.book');
const bookshelf = document.querySelector('#bookshelf');
let idBook = library.length;

function Book(title, author, image) {
  this.id = idBook;
  this.title = title;
  this.author = author;
  this.image = image;

  idBook += 1;
}

function ReloadLibrary() {
  library = JSON.parse(localStorage.library);

  bookshelf.innerHTML = '';
  bookshelf.appendChild(temp);

  for (let i = 0; i < library.length; i += 1) {
    
    DisplayBook(library[i]);
  }
}

function SaveBook(title, author, image) {
  const book = new Book(title, author, image);
  if (!Array.isArray(library)) {
    library = [];
  }
  library.push(book);

  localStorage.library = JSON.stringify(library);

  ReloadLibrary();
}


function AddBook() {

  event.preventDefault();

  const formAddBook = document.forms.AddBook;
  const bookData = new FormData(formAddBook);

  const bookTitle = bookData.get('title');
  const bookAuthor = bookData.get('author');
  const bookImage = bookData.get('image');
  

  formAddBook.reset();

  SaveBook(bookTitle, bookAuthor, bookImage);
}






function DeleteBook(id) {
  library = library.filter((book) => book.id !== id);

  localStorage.library = JSON.stringify(library);

  ReloadLibrary();
}

function DisplayBook(book) {
  const clon = temp.content.cloneNode(true);
  clon.querySelectorAll('p')[0].innerHTML = 'BOOK NAME: '+book.title;
  clon.querySelectorAll('p')[1].innerHTML = 'AUTHOR NAME: '+book.author;
  clon.querySelectorAll('p')[2].innerHTML = 'Image Link: '+book.image;


  clon.querySelector('button').addEventListener('click', () => { DeleteBook(book.id); });

  bookshelf.appendChild(clon);
}

var loadFile = function(event) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
};


ReloadLibrary();