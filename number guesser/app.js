/*
Funcionalidad del juego:
· El jugador debe adivinar un número entre el mínimo y el máximo
· El jugador recibe un número de chances
· Notificar al jugador de las chances restantes
· Notificar al jugador del número correcto si pierde
· Permitir al jugador jugar de nuevo
*/

//Definición de variables del juego
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//Elementos del UI
const   game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

//Asignar mínimo y máximo a la UI
minNum.textContent = min;
maxNum.textContent = max;

//Evento de jugar de nuevo: va a usar como disparador del evento el 'mousedown' porque si usa el click, entra en una especie de conflicto con la función del botón anterior (sumbit el numero a adivinar)

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});



//Evento de la adivinanza
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //Validar la entrada: acá se equivoca, ya que aparentemente no se puede incluir a un NaN como un tipo de dato a comparar, y sí usa el método 'isNaN' más abajo. Dejo el ejemplo "mal hecho"
  // if(guess === NaN || guess < min || guess > max){
  //   setMessage(`Por favor, ingresá un número entre ${min} y ${max}`);
  // }

  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Por favor, ingresá un número entre ${min} y ${max}`, 'red');
  } else {

  //Chequear si ganó
  if(guess === winningNum){
    // //Disable input
    // guessInput.disabled = true;
    // //Cambiar el color del borde
    // guessInput.style.borderColor = 'green';
    // //Mensaje de juego ganado
    // setMessage(`${winningNum} es correcto!! Ganaste.`, 'green');

    gameOver(true, `${winningNum} es correcto!! Ganaste.`);


  } else {
    //Número equivocado: primero quita una chance de adivinar. Se hace poniendo -= 1
    guessesLeft -=1;

    if(guessesLeft === 0){
      //Game overrr (perdió)

      // Disable input
      // guessInput.disabled = true;
      // Cambiar el color del borde
      // guessInput.style.borderColor = 'red';
      // Mensaje de juego ganado
      // setMessage(`Se acabó el juego, perdiste :( el número correcto era ${winningNum}`, 'purple');

      gameOver(false, `Se acabó el juego, perdiste :( el número correcto era ${winningNum}`);

    } else {
      //El juego continúa, adivinó mal

      guessInput.style.borderColor = 'red';
      //Mensaje de numero mal elegido
      setMessage(`${guess} no es correcto. Te quedan ${guessesLeft} chances`, 'red');
      //Limpiar el imput
      guessInput.value = '';

    } 

  }

}

})

//Game over

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'purple';
  //Disable input
  guessInput.disabled = true;
  //Cambiar el color del borde
  guessInput.style.borderColor = color;
  //Cambiar el color del texto
  message.style.color = color;
  //Mensaje de juego ganado
  setMessage(msg);

  //Jugar de nuevo
  guessBtn.value = 'Play again';
  //Le agrega una clase con +=
  guessBtn.className += 'play-again';
}

//Randomizar el numero ganador. ¿Qué es hoisting?

function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}