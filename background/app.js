let backg = document.querySelector('#imagen');
let texto = document.querySelector('#texto');
backg.addEventListener('mousemove', runEvent);

function runEvent(e){
  console.log(e.type);
  let equis = e.offsetX;
  let ye = e.offsetY;
  let equis2 = (equis / 2);
  let ye2 = (ye/2);
  texto.innerText = `${equis}, ${ye}`;
  texto.style.color = `rgb(250,${equis}, ${equis})`
  document.body.style.backgroundColor = `rgb(${equis2}, ${ye2}, 0)`;
  
}
