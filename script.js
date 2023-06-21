// Obtenemos referencias a los elementos del DOM
const display = document.querySelector('.calculator__display');
const keys = document.querySelectorAll('.key');

// Asignamos un evento de clic a cada botón
keys.forEach(key => {
  key.addEventListener('click', handleClick);
});

// Función de controlador de clic
function handleClick(event) {
  const keyValue = event.target.textContent;

  // Si el botón AC es presionado, limpiamos el display
  if (keyValue === 'AC') {
    display.textContent = '0';
  }
  // Si el botón = es presionado, evaluamos la expresión matemática
  else if (keyValue === '=') {
    try {
      const result = evaluateExpression(display.textContent);
      display.textContent = result;
    } catch (error) {
      display.textContent = 'Error';
    }
  }
  // De lo contrario, agregamos el valor del botón al display
  else {
    // Si el display muestra solo 0, reemplazamos ese valor
    if (display.textContent === '0' || display.textContent === 'Error') {
      display.textContent = keyValue;
    }
    // De lo contrario, agregamos el valor al final del display
    else {
      display.textContent += keyValue;
    }
  }
}

// Función para evaluar la expresión matemática
function evaluateExpression(expression) {
  // Remplazamos los caracteres de la multiplicación y la división
  expression = expression.replace('×', '*').replace('÷', '/');

  // Utilizamos la función eval() de forma segura
  const result = Function(`'use strict'; return (${expression})`)();

  // Redondeamos el resultado a 2 decimales
  return Math.round(result * 100) / 100;
}
