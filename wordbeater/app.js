
const levels = {
  easy: 5,
  medium: 4,
  hard: 3
};

const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'choclo',
  'libro',
  'constitucion',
  'auto',
  'siete',
  'ñoño',
  'javascript'
];

window.addEventListener('load', init);

function init() {
  seconds.innerHTML = currentLevel;
  showWord(words);
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
};


function startMatch() {
  if(matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  };
  if(score === -1){
    scoreDisplay.innerHTML = 0;
  } else {
  scoreDisplay.innerHTML = score;
  }
}

function matchWords() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correcto!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}




function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
};


function countdown() {
  if(time > 0) {
    time--;
  } else if(time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}


function checkStatus() {
  if(!isPlaying && time === 0){
    message.innerHTML = 'Game overr!';
    score = -1;
  }
}