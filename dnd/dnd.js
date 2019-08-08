const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
const escolta = document.querySelector('#dos');
const alero = document.querySelector('#tres');
const escCampo = document.querySelector('#esc');

//Fill Listeners

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

//Loop through empties and call drag events

for(const empty of empties){
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

//Drag Functions

function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className += ' invisible'), 0);
};

function dragEnd() {
  this.className = 'fill';
};

function dragOver(e){
  e.preventDefault();
}

function dragEnter(e){
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave(){
  this.className = 'empty';
}

function dragDrop(){
  this.className = 'empty';
  this.append(fill);
  if(this.id = 'ap') {
    console.log('ok');
  }
}

escolta.addEventListener('drop', llenarCampos);

function llenarCampos(){
  escCampo.innerHTML = '<p>Kawhi Leonard </p> <p>Dorsal: 2</p> <p>Altura: 2.01</p>';
}


//titulo.innerHTML = '<h4 style="color: green";>Mi propia lista de todos</h3>'
//<p>Nombre: </p> <p>Dorsal: </p> <p>Altura: