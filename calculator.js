let displayValue = document.querySelector('p');
let lastPressedButton = "";
let lastOperand = NaN, currentOperand, currentOperator;

let buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', e => {
        buttonPress(e.target.textContent.toLowerCase(), lastPressedButton);
    });
})

document.addEventListener('keydown', e => {
    let button = (e.key == 'Backspace') ? 'bksp' : (e.key == 'c') ? 'clear' : (e.key == 'Enter') ? '=' : e.key;
    buttonPress(button, lastPressedButton);
});

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if (b != 0){
                return divide(a, b);
            }
            return 'Error';
        default:
            return a ? a : b;
    }
}

function buttonPress(button, previousButton){
    if (button == '+/-'){
        if (+displayValue.textContent){
            displayValue.textContent = -displayValue.textContent;
        }
        currentOperand = +displayValue.textContent;
    }else if (button == 'bksp'){
        displayValue.textContent = displayValue.textContent.slice(0, -1);
        if (displayValue.textContent.charAt(displayValue.textContent.length - 1) == '.'){
            displayValue.textContent = displayValue.textContent.slice(0, -1);
            lastPressedButton = '.';
        }else{
            lastPressedButton = displayValue.textContent.charAt(displayValue.textContent.length - 1);
        }
        currentOperand = +displayValue.textContent;
    }else if (previousButton == '.' && !displayValue.textContent.includes('.') && '1234567890'.includes(button)){
        displayValue.textContent += `.${button}`; 
        currentOperand = +displayValue.textContent;
    }else if ('1234567890'.includes(button)){
        if (!'+-*/='.includes(previousButton)){
            displayValue.textContent += button;
        }else{
            displayValue.textContent = button;
        }
        currentOperand = +displayValue.textContent;
    }else if (button == 'clear'){
        displayValue.textContent = "";
        currentOperand = 0;
        lastOperand = 0;
        currentOperator = 'id';
    }else if ('+-*/'.includes(button)){
        if (lastOperand){
            displayValue.textContent = operate(currentOperator, lastOperand, currentOperand);
            currentOperand = +displayValue.textContent;
            lastOperand = currentOperand;
        }else{
            lastOperand = currentOperand;
        }
        currentOperator = button;
    }else if (button == '='){
        displayValue.textContent = operate(currentOperator, lastOperand, currentOperand);
        currentOperand = +displayValue.textContent;
        lastOperand = NaN;
        currentOperator = 'id';
    }
    lastPressedButton = button;
    if (displayValue.textContent.charAt(displayValue.textContent.length -1) != '0'){
        displayValue.textContent = (+displayValue.textContent) ? Math.round(displayValue.textContent * 10**5) / 10**5 : displayValue.textContent;
    }
     
}