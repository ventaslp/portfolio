//Evento de submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //Ocultar resultados
  //document.querySelector('#results').style.display = 'none';
  // //Mostrar el gif de carga
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Calcular resultados

function calculateResults () {
  console.log('Calculando');
    //Variables de la UI
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Calcular el pago mensual
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    // Show results
    document.querySelector('#results').style.display = 'block';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    //Invoca a la función de 'Show Error'
    showError('Por favor corregir los números');
  }
}

//Función de error

function showError(error){
  //Ocultar los resultados
  document.querySelector('#results').style.display = 'none';
  //Ocultar el gif
  document.getElementById('loading').style.display = 'none';
  //Crear un div
  const errorDiv = document.createElement('div');
  //Seleccionar elementos del DOM
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')
  //Agregar una clase
  errorDiv.className = 'alert alert-danger';
  //Crear y apendizar texto
  errorDiv.appendChild(document.createTextNode(error));
  //Insertar el error arriba del Heading: utiliza el método 'insertBefore', para lo que se necesita un elemento padre, y luego donde se necesita que aparezca el objeto nuevo, y antes de qué elemento child va a aparecer. En este caso, selecciona al objeto Card como padre, y crea el div antes del heading
  card.insertBefore(errorDiv, heading);
  //Borrar el errorDiv después de 3 segundos: setTimeout puede llevar como parámetro la funcion y el tiempo, o bien invocar a una funcion por fuera y el tiempo, que es lo que se hace a continuación:
  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}