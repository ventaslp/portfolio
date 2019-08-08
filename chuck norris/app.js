/*
document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e){
  //En este caso hay un sólo input en el HTML, pero en caso de haber varios, con un querySelector se puede indicar el tipo de input entre corchetes
  const number = document.querySelector('input[type="number"]').value;

  const xhr = new XMLHttpRequest();

  xhr.open(`GET`, `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = '';

      if(response.type === 'success') {
        response.value.forEach(function(joke){
          output += `<li>${joke.joke}</li><br>`
        });

      } else {
        output += '<li>Algo salió mal</li>';
      }

      document.querySelector('.jokes').innerHTML = output;

    }
  }

  xhr.send();

  e.preventDefault();
}
*/

//API significa 'Application Programming Interface', y es un término muy amplio, pero es básicamente un 'contrato' que se hace entre dos softwares (pueden ser de webs, celus, hasta heladeras), que tienen un pedido y una respuesta a ese pedido, ambos estructurados. Se pide una determinada cosa y de una determinada forma. La app de los chistes de Chuck Norris es una Web API

//REST APIs: REST significa 'Representational State Transfer', y es un 'estilo arquitectónico para aplicaciones de red' (o algo así), usa protocolo de HTTP, los objetos del servidor pueden ser leídos, creados o borrados, cada API tiene sus reglas y estructuras, y se puede acceder a ellos con casi cualquier lenguaje de programación

//Tipos de solicitudes por HTTP
//GET: recibir data de una fuente específica
//POST: enviar data para ser procesada por una fuente específica
//PUT: actualizar una fuente específica
//DELETE: borrar una fuente específica

//Otros métodos menos usados: HEAD, como GET pero no devuelve el body; OPTIONS, retorna los métodos soportados por HTTP, y PATCH, actualiza fuentes parcialmente    


//Callback functions

const posts = [
  { title: 'Post One', body: 'This is post one'},
  { title: 'Post Two', body: 'This is post two' }
]