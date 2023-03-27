// Set up the first operand and second operand
let operandFirst = 0;
let operandSecond = 0;

// Set up display number as you type digits
// The display number will ultimately be the concatenation of the "wholeNumber" + "." + "decimalNumber"
let displayNumber = 0;
let wholeNumber = 0;
let decimalNumber = 0;
let decimalPressedIndicator = false;

// Set up equal button to prevent from clicking
let equalFirst = true;
let equalTwice = false;

// Set operator list indicators [divide, multiply, subtract, add]
let operationTask = ["/", "x", "-", "+", "^"];
let operationIndex = 0;
let firstOperationCall = true;

// Query HTML to display the numbers and operation of numbers
const displayNumberPresentation = document.querySelector('.display-number');
const displayOperationPresentation = document.querySelector('.stored-operation');

// Set up number buttons to update the displayNumber
const numericButton = document.querySelectorAll('.numeric-button');
for (let i = 0; i < numericButton.length; i++) {
    let numericButtonItem = numericButton[i];
    numericButtonItem.addEventListener('click', () => {
        if (!decimalPressedIndicator) {
            wholeNumber = (wholeNumber * 10) + Number(numericButtonItem.innerText);
            displayNumber = wholeNumber;
            displayNumberPresentation.innerHTML = displayNumber;
        }else {
            decimalNumber = (decimalNumber * 10) + Number(numericButtonItem.innerText);
            displayNumber = Number(wholeNumber + "." + decimalNumber);
            displayNumberPresentation.innerHTML = displayNumber;
        }
    });
};

// Set up decimal button functionality
//     Switch will flip to ensure the displayNumber is assembled correctly
const decimalButton = document.querySelector('.decimal-button');
decimalButton.addEventListener('click', () => {
    if (!decimalPressedIndicator) {
        displayNumberPresentation.innerHTML = displayNumber + ".";
        decimalPressedIndicator = true;
    }
});

// Set up operator button functionality
//     Store an index number that tracks which operator button was clicked
//     Set the operandFirst to the displayNumber 
const operatorButton = document.querySelectorAll('.operator-button');
for (let i = 0; i < operatorButton.length; i++) {
    let operatorButtonItem = operatorButton[i];
    operatorButtonItem.addEventListener('click', () => {
        if (operatorButtonItem.innerText == "/") {
            operationIndex = 0;
            if (firstOperationCall) {operandFirst = 1}; 
        } else if (operatorButtonItem.innerText == "x") {
            operationIndex = 1; 
            if (firstOperationCall) {operandFirst = 1}; 
        } else if (operatorButtonItem.innerText == "-") {
            operationIndex = 2; 
            if (firstOperationCall) {operandFirst = 0}; 
        } else if (operatorButtonItem.innerText == "+") {
            operationIndex = 3; 
            if (firstOperationCall) {operandFirst = 0}; 
        } else if (operatorButtonItem.innerText == "^") {
            operationIndex = 4; 
            if (firstOperationCall) {operandFirst = 1}; 
        }
        firstOperationCall = false;
        operandSecond = operandFirst;
        operandFirst = displayNumber;
        operandFirst = equate();
        displayNumber = operandFirst
        displayOperationPresentation.innerHTML = operandFirst + " " + operationTask[operationIndex];
        displayNumberPresentation.innerHTML = displayNumber;
        wholeNumber = 0;
        decimalNumber = 0;
        decimalPressedIndicator = false;
        equalFirst = false;
        equalTwice = false;
    });
};

// Set up function that equates operation
function equate(){
    let result = 0;
    if (operationIndex == 0) {
        result = operandFirst / operandSecond;
    } else if (operationIndex == 1) {
        result = operandFirst * operandSecond;
    } else if (operationIndex == 2) {
        result = operandFirst - operandSecond;
    } else if (operationIndex == 3) {
        result = operandFirst + operandSecond;
    } else if (operationIndex == 4) {
        result = operandFirst ** operandSecond;
    } 
    return result
}

// Set up equal button functionality
const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', () => {
    if (!equalFirst && !equalTwice) {
        operandSecond = displayNumber;
        displayOperationPresentation.innerHTML = operandFirst + " " + operationTask[operationIndex] + " " + operandSecond + " =";
        displayNumber = equate();
        firstOperationCall = true;
        displayNumberPresentation.innerHTML = displayNumber;
        equalTwice = true;
    }
});

// Set up escape button functionality
const escapeButton = document.querySelector('.escape-button');
escapeButton.addEventListener('click', () => {
    wholeNumber = 0;
    decimalNumber = 0;
    displayNumber = 0;
    firstOperationCall = true;
    decimalPressedIndicator = false;
    operandFirst = 0;
    operandSecond = 0;
    displayOperationPresentation.innerHTML = "";
    displayNumberPresentation.innerHTML = "";
    equalFirst = true;
    equalTwice = false;
});

// Set up delete button functionality
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
    displayNumber = displayNumber.toString().substring(0,displayNumber.toString().length - 1);
    wholeNumber = displayNumber.split(".")[0];
    decimalNumber = displayNumber.split(".")[1];
    displayNumber = Number(displayNumber)
    displayNumberPresentation.innerHTML = displayNumber;
});


// Set up +/- button functionality
const negButton = document.querySelector('.plus-minus');
negButton.addEventListener('click', () => {
    displayNumber = -1*Number(displayNumber)
    displayNumberPresentation.innerHTML = displayNumber;
});