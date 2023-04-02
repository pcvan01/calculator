// Set up the first operand and second operand for operations
let operandFirst = 0;
let operandSecond = 0;

// Set up display number as you type digits
// Set up boolean to only allow for a single decimal to be pressed
// Set up boolean to refresh display number after operations
let displayNumber = "0";
let decimalPressedIndicator = false;
let refreshKeyStroke = false;

// Set up operator list indicators [divide, multiply, subtract, add, power]
// Set up index to track operator last clicked
// Set up boolean to track when operator button is first clicked after an equal sign is clicked
// Set up boolean to track if operator will be adjust without calculation
let operationTask = ["/", "x", "-", "+", "^"];
let operationIndex = 0;
let firstOperationCall = true;
let operatorCallLive = false;

// Set up boolean to track when equal is first clicked
// Set up boolean to track when user is allowed to first click start button
// Set up boolean to track when equal has been presed at least once - for unique delete button fuctionality
let equalFirst = false;
let equalStart = false;
let equalPressed = false;

// Query HTML to display the numbers and operation of numbers
const displayNumberPresentation = document.querySelector('.display-number');
const displayOperationPresentation = document.querySelector('.stored-operation');

// Set up function that equates operation
function equate(){
    let result = 0;
    if (operationIndex == 0) {
        result = Number(operandFirst) / Number(operandSecond);
    } else if (operationIndex == 1) {
        result = Number(operandFirst) * Number(operandSecond);
    } else if (operationIndex == 2) {
        result = Number(operandFirst) - Number(operandSecond);
    } else if (operationIndex == 3) {
        result = Number(operandFirst) + Number(operandSecond);
    } else if (operationIndex == 4) {
        result = Number(operandFirst) ** Number(operandSecond);
    } 
    return result
}

// Define function that resets display
function resetDisplay() {
    if (refreshKeyStroke){
        displayNumber = "0";
        decimalPressedIndicator = false;
        refreshKeyStroke = false;
    }
}

// Define function the resets display after an operator button is clicked
function resetDisplayAfterOperator() {
    if (operatorCallLive) {
        displayNumber = "0";
        operatorCallLive = false;
        decimalPressedIndicator = false;
        firstOperationCall = false;
    }
}

// Set up operator button functionality
const operatorButton = document.querySelectorAll('.operator-button');
for (let i = 0; i < operatorButton.length; i++) {
    let operatorButtonItem = operatorButton[i];
    operatorButtonItem.addEventListener('click', () => {
        // Deifne a function to identify what operator button was clicked
        function getOperatorClicked() {
            if (operatorButtonItem.innerText == "/") {
                operationIndex = 0;
            } else if (operatorButtonItem.innerText == "x") {
                operationIndex = 1; 
            } else if (operatorButtonItem.innerText == "-") {
                operationIndex = 2; 
            } else if (operatorButtonItem.innerText == "+") {
                operationIndex = 3; 
            } else if (operatorButtonItem.innerText == "^") {
                operationIndex = 4; 
            }
        }
        // Assign the first operand to the display number when the operand is clicked for the fist time
        //   and display the operand and clicked operator
        if (!operatorCallLive && firstOperationCall) {
            getOperatorClicked()
            operandFirst = displayNumber;
            operatorCallLive = true;
            displayOperationPresentation.innerHTML = Number(operandFirst) + " " + operationTask[operationIndex];
        // If it's not the first operation call and and operator was not the last clicked butt
        //   set the second operand to the display number, calculate, and then display    
        } else if (!operatorCallLive && !firstOperationCall) {
            operandSecond = displayNumber;
            operandFirst = equate()
            displayNumber = operandFirst
            getOperatorClicked()
            refreshKeyStroke = true;
            operatorCallLive = true;
            displayOperationPresentation.innerHTML = Number(operandFirst) + " " + operationTask[operationIndex];
            displayNumberPresentation.innerHTML = displayNumber;
        // If an operator button was last clicked, simply adjust the operator and display
        } else if (operatorCallLive) {
            getOperatorClicked()
            displayOperationPresentation.innerHTML = Number(operandFirst) + " " + operationTask[operationIndex];
        }
        if (!equalStart) {
            refreshKeyStroke = true;
        }
        equalStart = true;
        equalFirst = true
    });
};

// Set up number buttons to update the displayNumber
const numericButton = document.querySelectorAll('.numeric-button');
for (let i = 0; i < numericButton.length; i++) {
    let numericButtonItem = numericButton[i];
    numericButtonItem.addEventListener('click', () => {
        resetDisplay();
        resetDisplayAfterOperator()
        displayNumber = displayNumber + numericButtonItem.innerText;
        if (displayNumber.length > 20){
            displayNumber = displayNumber.substring(0, displayNumber.length - 1);
        } else if (!decimalPressedIndicator && displayNumber[0] == "0"){
            displayNumber = displayNumber.substring(1, displayNumber.length);
        } else if (!decimalPressedIndicator && displayNumber.substring(0,2) == "-0"){
            displayNumber = "-" + displayNumber.substring(2, displayNumber.length);
        }else if (displayNumber == "00" || displayNumber == "-00"){
            displayNumber = displayNumber.substring(0, displayNumber.length - 1);
        }
        displayNumberPresentation.innerHTML = displayNumber;
        equalFirst = true
        if (firstOperationCall) {
            equalFirst = false
        }
    });
};

// Set up decimal button functionality
//     Switch will flip to ensure the displayNumber is assembled correctly
const decimalButton = document.querySelector('.decimal-button');
decimalButton.addEventListener('click', () => {
    resetDisplay();
    resetDisplayAfterOperator()
    if (!decimalPressedIndicator) {
        displayNumber = displayNumber + ".";
        decimalPressedIndicator = true;
        displayNumberPresentation.innerHTML = displayNumber;
    }
    equalFirst = true
    if (firstOperationCall) {
        equalFirst = false
    }
});

// Set up delete button functionality
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
    resetDisplay();
    if (displayNumber.slice(-1) == ".") {
        decimalPressedIndicator = false
    }
    if (displayNumber.length == 1 || displayNumber == "-0") {
        displayNumber = "0";
        displayNumberPresentation.innerHTML = displayNumber;
    } else if (displayNumber.length == 2 && displayNumber[0] == "-"){
        displayNumber = "-0";
        displayNumberPresentation.innerHTML = displayNumber;
    } else {
        displayNumber = displayNumber.substring(0,displayNumber.length - 1);
        if (displayNumber.slice(-1) == ".") {
            displayNumberPresentation.innerHTML = displayNumber;
        } else {
            displayNumberPresentation.innerHTML = Number(displayNumber);
        }
    }
    equalFirst = true
    if (firstOperationCall) {
        equalFirst = false
    }
    if (!equalPressed) {
        equalFirst = true
    }
});

// Set up +/- button functionality
const negButton = document.querySelector('.plus-minus');
negButton.addEventListener('click', () => {
    resetDisplay();
    resetDisplayAfterOperator()
    if (displayNumber[0] != "-") {
        displayNumber = "-" + displayNumber
    } else {
        displayNumber = displayNumber.substring(1,displayNumber.length);
    }
    if (displayNumber.slice(-1) == "." || displayNumber == "-0") {
        displayNumberPresentation.innerHTML = displayNumber;
    } else {
        displayNumberPresentation.innerHTML = Number(displayNumber);
    }
    equalFirst = true
    if (firstOperationCall) {
        equalFirst = false
    }
});

// Set up escape button functionality
const escapeButton = document.querySelector('.escape-button');
escapeButton.addEventListener('click', () => {
    operandFirst = 0;
    operandSecond = 0;
    displayNumber = "0";
    decimalPressedIndicator = false;
    firstOperationCall = true;
    operatorCallLive = false;
    equalFirst = true
    equalStart = false
    equalPressed = false
    displayOperationPresentation.innerHTML = ""
    displayNumberPresentation.innerHTML = displayNumber;
});



// Set up equal button functionality
const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', () => {
    if (equalFirst && equalStart) {
        operandSecond = displayNumber;
        displayNumber = equate();
        displayOperationPresentation.innerHTML = Number(operandFirst) + " " + operationTask[operationIndex] + " " + Number(operandSecond) + " =";
        displayNumberPresentation.innerHTML = displayNumber;
        firstOperationCall = true;
        operatorCallLive = false;
        equalFirst = false;
        refreshKeyStroke = true;
    } else if (equalStart) {
        operandFirst = displayNumber;
        displayNumber = equate();
        displayOperationPresentation.innerHTML = Number(operandFirst) + " " + operationTask[operationIndex] + " " + Number(operandSecond) + " =";
        displayNumberPresentation.innerHTML = displayNumber;
        operatorCallLive = false;
        firstOperationCall = true;
        refreshKeyStroke = true;
    }
    equalPressed = true;
});