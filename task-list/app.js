
//Definir las variablesUI

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Cargar todos los event listeners
loadEventListeners();

function loadEventListeners(){
  //Evento de carga de DOM
  document.addEventListener('DOMContentLoaded', getTasks);
  //Evento de agregar una tarea
  form.addEventListener('submit', addTask);
  //Evento de borrar una tarea: se aplica el 'Event listener' a todo el UL, y después se delega
  taskList.addEventListener('click', removeTask);
  //Evento para borrar todas las tareas
  clearBtn.addEventListener('click', clearTasks);
  //Evento de filtrar tareas
  filter.addEventListener('keyup', filterTasks)
};

//Agregar tarea
function addTask(e) {
  if(taskInput.value === '') {
  } else {
  //Crear el elemento LI
  const li = document.createElement('li');
  //Agregar una clase
  li.className = 'collection-item  indigo lighten-5';
  //Crear texto y apendizarlo al LI
  li.appendChild(document.createTextNode(taskInput.value));
  //Crear nuevo elemento de link
  const link = document.createElement('a');
  //Agregarle una clase
  link.className = 'delete-item secondary-content';
  //Agregar el elemento HTML icono
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  //Apendizar el link al LI
  li.appendChild(link);
  //Apendizar el LI a la UL
  taskList.appendChild(li);

  //Almacenar en memoria local al navegador
  storeTaskInLocalStorage(taskInput.value);

  //Borrar el input
  taskInput.value = '';

  e.preventDefault();
  };
};

//Función de borrar tarea

function removeTask(e) {
  
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('¿Desea borrar la tarea?')){
      e.target.parentElement.parentElement.remove();

      //Borar de la memoria local
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


//Función de borrar todas las tareas: hay dos formas, limpiar el elemento HTML de una, o bien ir uno por uno, siendo este último el más rápido

function clearTasks() {
  //taskList.innerHTML = '';

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  
  //Invocación de borrar todo de la memoria local
  clearTasksFromLocalStorage();
}

//Función de borrar todo de la memoria local

function clearTasksFromLocalStorage(){
  localStorage.clear();
}


//Función de filtrar

function filterTasks(e) {
  //Así se obtiene el texto ingresado en el input, en minúsculas
  const text = e.target.value.toLowerCase();
  //Aquí accede a todos los LI, en forma de 'Node list' y le aplica el método 'forEach()'
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      //de cada LI obtiene su texto
      const item = task.firstChild.textContent;
      //si el o los caracteres son distintos al vacío, pone a esa task en una lista
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        //si no hay match, lo oculta
        task.style.display = 'none';
      }
    }
  );
};

//Función de guardar en memoria
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Función de obtener las tareas de la memoria local

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
  //Crear el elemento LI
  const li = document.createElement('li');
  //Agregar una clase
  li.className = 'collection-item';
  //Crear texto y apendizarlo al LI
  li.appendChild(document.createTextNode(task));
  //Crear nuevo elemento de link
  const link = document.createElement('a');
  //Agregarle una clase
  link.className = 'delete-item secondary-content';
  //Agregar el elemento HTML icono
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  //Apendizar el link al LI
  li.appendChild(link);
  //Apendizar el LI a la UL
  taskList.appendChild(li);
  })

}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}