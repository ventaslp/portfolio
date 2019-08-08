class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
   const list = document.getElementById('book-list');
  //Crear elemento tr
  const row = document.createElement('tr');
  //Insertar columna
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
  }

  showAlert(message, className) {
  //create div
  const div = document.createElement('div');
  //Add class
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  //Insertar alerta
  container.insertBefore(div, form);

  //Set Timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}


//Local storage class

class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  
  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;
      //Agregar libro a UI
      ui.addBookToList(book);
    });
  }

  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){
      const ui = new UI;
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listener para agregar libro

document.getElementById('book-form').addEventListener('submit', function(e){
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Instanciar el objeto libro
  const book = new Book(title, author, isbn);
  
  //Instanciar el objeto ui
  const ui = new UI();
  
  //Validar
  if(title === '' || author === '' || isbn === ''){
    //Error alert
    ui.showAlert('Por favor, llená todos los campos', 'error');
  } else {
  //Agregar libro a la lista
  ui.addBookToList(book);

  //Agregar libro a la memoria local
    Store.addBook(book);


  //Cartel de bien agregado
  ui.showAlert('Libro agregado!!', 'success');
  //Clear fields
  ui.clearFields();
  }
  e.preventDefault();
});

//Event listener para borrar libro: cada elemento de la lista se va a borrar cuando se hace click en la X. Pero no se selecciona la x en el event listener, sino que se toma al elemento padre (que tiene el id #book-list) y luego se va a delegar

document.getElementById('book-list').addEventListener('click', function(e){
  
  //Instanciar el UI
  const ui = new UI();

  //Función de borrar de la lista
  ui.deleteBook(e.target);

  //Remover de la memoria local: como es una cadena de caracteres, no se puede acceder a un índice, por lo que hay que hacer un poco de 'magia de sintaxis'. Lo que hace es obtener del click en la X, el elemento padre (que es un 'tr'), y de ahí el elemento hermano previo, que es el campo con el ISBN, y se obtiene el valor del texto que es el 'textcontent'.
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
  //Show mensaje de alerta
  ui.showAlert('Libro eliminado', 'success');
  
  e.preventDefault();
})