window.addEventListener('load', init);

let boton = document.querySelector('#task-form');
let titulo = document.getElementById('task');
let tiempo = document.querySelector('.tiempo');
let mensaje = document.querySelector('.msj');
let fotos = document.querySelector('.fotos');
let conteo = document.querySelector('.conteo');
let aciertos = document.querySelector('.aciertos');
let temp = document.querySelector('.temp')

let time = 20;
let acierto = 0;
let i = 0;
let num = 1;

mensaje.innerHTML = '...';
aciertos.innerHTML = acierto;

boton.addEventListener('submit', juego)

let titulos = [
  'breaking bad',
  'lost',
  'true detective',
  'friends',
  'house of cards',
  'the big bang theory',
  'family guy',
  'stranger things',
  'the office',
  'sherlock',
  'game of thrones',
  '24',
  'scrubs',
  'futurama',
  'mad men',
  'parks and recreation',
  'spongebob squarepants',
  '30 rock',
  'heroes',
  'vikings'
]

function init(){
  setInterval(countdown, 1000);
  displayFotos();
};

function juego(e) {
  e.preventDefault();
  if (i<19){
  respuesta();
  } else if (i=19) {
    if(titulo.value === titulos[i]) {
      mensaje.innerHTML = 'Muy bien!'
      sumarAcierto();
    };
    mensaje.innerHTML = 'Terminó el juego.'
    boton.style = 'display: none';
    temp.style = 'display: none';
    time = -1;
  }
}

function puntos(){
  mensaje.innerHTML = 'Sigue jugando';
  mensaje.style = 'color: snow';
}

function respuesta() {
  if(titulo.value === titulos[i]) {
    mensaje.innerHTML = 'Muy bien!';
    mensaje.style = 'color: green';
    setTimeout(puntos, 2000);
    sumarAcierto();
  } else {
    mensaje.innerHTML = 'Incorrecto!';
    mensaje.style = 'color: red';
    setTimeout(puntos, 2000);
  }
  titulo.value = '';
  i++;
  num++;
  time = 20;
  displayFotos();
}

function sumarAcierto(){
  acierto++;
  aciertos.innerHTML = acierto;
}



function countdown(){
  if(time > 0) {
    time--;
  } else if(time === 0){
    mensaje.innerHTML = 'Perdiste! Se terminó el tiempo.'
    boton.style = 'display: none';
    temp.style = 'display: none';
    time = -1;
  }
  tiempo.innerHTML = time;
};

function displayFotos() {
  fotos.innerHTML = `<div class="col">
                     <img src="img/${num}/1.jpg">
                     </div>
                     <div class="col">
                     <img src="img/${num}/2.jpg">
                     </div>
                     <div class="col">
                     <img src="img/${num}/3.jpg">
                     </div>`;
}