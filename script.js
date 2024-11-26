// mathmetic functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b !== 0 ? a / b : 'Error';
}

function operator(operation, a, b) {
    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

// Initialize variables
let previousNum = ''; 
let operations = ['+','-','x','/']
let currentOperator = ''; 
let nextNum = ''; 

let displayInput = document.getElementById('display');

function updateDisplay(value) {
    displayInput.value = value;
}

function resetCalculator() {
    previousNum = '';
    currentOperator = '';
    nextNum = '';
    isDecimalUsed = false;
    updateDisplay('0');
}

function handleButtonClick(value) {
    if(displayInput.value === 'Error'){
        resetCalculator();
        handleButtonClick(value);
    }
    else if (value === 'clear') {
        resetCalculator(); 
    } else if (operations.includes(value)) {
        if (previousNum && nextNum && currentOperator) {
            const result = operator(currentOperator, parseFloat(previousNum), parseFloat(nextNum));
            updateDisplay(result);
            previousNum = result.toString();
            nextNum = '';
        }
        currentOperator = value; // Set the current operator
        updateDisplay(previousNum + ` ${currentOperator} `);
    } else if (value === '=') {

        if (previousNum && nextNum && currentOperator) {
            const result = operator(currentOperator, parseFloat(previousNum), parseFloat(nextNum));
            updateDisplay(result);
            previousNum = result.toString();
            nextNum = '';
            currentOperator = '';
        }
    }  else {
        // Handle number input
        if (currentOperator) {
            nextNum += value; 
        } else {
            previousNum += value; 
        }
        updateDisplay(displayInput.value + value);
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});
