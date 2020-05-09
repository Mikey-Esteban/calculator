console.log('script running');

let container = document.querySelector('#container');
let display = document.querySelector('.display');
let inputs = document.querySelectorAll('.input');
let displayValue;
let operators = document.querySelectorAll('.operator');

inputs.forEach((input, i) => {
  input.addEventListener('click', function(){
    if (this.id == 'clear') {
      display.textContent = '';
    }
    else if (this.id == 'equal') {
      console.log('run analysis')
      displayValue = display.textContent;
      display.textContent = ''
      analyze(displayValue);
    }
    else if (this.id == 'backspace'){
      display.textContent = display.textContent.slice(0, -1)
    }
    else if (this.classList.contains('operator')){
      display.textContent += `${this.textContent}`
    }
    else {
      display.textContent += this.textContent
    }
  })
});


function analyze(displayValue){
  let operatorLocations = [];
  operators2 = ['+', '-','*', '%']
  higherOrderOperators = ['*', '%']
  lowerOrderOperators = ['+', '-']

  // we need to create an array of the displayValue to run our operator functions later on
  let equation = [];
  let i = 0;
  let j = 0;
  while (j<displayValue.length){
    if (operators2.includes(displayValue[j])){
      console.log('found operator ' + displayValue[j])
      substring = displayValue.slice(i,j)
      equation.push(substring)
      equation.push(displayValue[j])
      i=j+1;
      j++;
    }
    else{
      j++;
    }
  }
  equation.push(displayValue.slice(i,j))

  while (equation.length > 1) {
    findOperator(equation, higherOrderOperators)
    findOperator(equation, lowerOrderOperators)
  }
}


function add(x,y){
  return Number(x) + Number(y)
}
function subtract(x,y){
  return x-y
}
function multiply(x,y){
  return x*y
}
function divide(x,y){
  return x/y
}
function operate(func, x, y){
  return func(x,y)
}

function whichOperator(operator){
  operators.forEach((item, i) => {
    if (item.textContent == operator) {
      func = item.id;
      if (func == 'multiply') {
        answer = operate(multiply, x, y)
      }
      else if (func == 'divide') {
        answer = operate(divide, x, y)
      }
      else if (func == 'add') {
        answer = operate(add, x, y)
      }
      else {
        answer = operate(subtract, x, y)
      }
    }
  })
  return answer
}

function findOperator(equation, searchOperators){
  i = 0;
  while (i <= equation.length) {
    console.log('WALKING THROUGH i: ' + i )
    if (searchOperators.includes(equation[i])) {
      console.log('ABOUT TO RUN A FUNCTION')
      x = equation[i-1]
      y = equation[i+1]
      operator = equation[i]
      answer = whichOperator(operator)
      console.log('ANSWER ' + answer)
      display.textContent = answer
      equation.splice(i-1, 3)
      equation.splice(i-1, 0, answer)
      // equation.unshift(answer)
      console.log('EQUATION IS NOW: ' + equation)
    }
    else {
      i++; // couldnt find higher order
    }
  }
}
