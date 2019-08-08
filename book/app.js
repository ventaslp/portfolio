//Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

//Función prototipada de agregar el libro
UI.prototype.addBookToList = function(book){
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

//Show Alert

UI.prototype.showAlert = function(message, className) {
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

//Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

//Clear Fields

UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


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

  ui.deleteBook(e.target);

  //Show mensaje de alerta

  ui.showAlert('Libro eliminado', 'success');
  
  e.preventDefault();
})