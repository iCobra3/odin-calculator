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
    return b !== 0 ? a / b : 'ERROR';
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
    updateDisplay('0');
}

function handleButtonClick(value) {
    // isStart = false;
    if(displayInput.value === 'ERROR'){
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
            updateDisplay(result.toFixed(1));
            previousNum = result.toString();
            nextNum = '';
            currentOperator = '';
        }
        else{
            return updateDisplay("ERROR");
        }
    }  else {
        // Handle number input
        if (currentOperator) {
            nextNum += value; 
        } else {
            previousNum += value; 
        }
        // make the zero vanish if it's the first tap
        displayInput.value === '0'? updateDisplay(value):updateDisplay(displayInput.value + value);

    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});
