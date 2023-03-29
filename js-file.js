// Set up the first operand and second operand
let operandFirst = 0;
let operandSecond = 0;

// Set up display number as you type digits
// Only allow for a single decimal to be pressed
let displayNumber = "0";
let decimalPressedIndicator = false;
let refreshKeyStroke = false;

// Set operator list indicators [divide, multiply, subtract, add]
let operationTask = ["/", "x", "-", "+", "^"];
let firstOperationCall = true;
let operatorCallLive = false;

// Set up equal button to prevent from clicking
let equalFirst = false;
let equalStart = false;


// Set up operator button functionality
//     Store an index number that tracks which operator button was clicked
const operatorButton = document.querySelectorAll('.operator-button');
for (let i = 0; i < operatorButton.length; i++) {
    let operatorButtonItem = operatorButton[i];
    operatorButtonItem.addEventListener('click', () => {
        if (!operatorCallLive && firstOperationCall) {
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
            operandFirst = displayNumber;
            displayOperationPresentation.innerHTML = operandFirst + " " + operationTask[operationIndex];
            operatorCallLive = true;
        } else if (!operatorCallLive && !firstOperationCall) {
            operandSecond = displayNumber;
            operandFirst = equate()
            displayNumber = operandFirst
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
            refreshKeyStroke = true;
            operatorCallLive = true;
            displayOperationPresentation.innerHTML = operandFirst + " " + operationTask[operationIndex];
            displayNumberPresentation.innerHTML = displayNumber;
        } else if (operatorCallLive) {
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
            displayOperationPresentation.innerHTML = operandFirst + " " + operationTask[operationIndex];
        }
        equalStart = true;
        equalFirst = true
    });
};

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


// Query HTML to display the numbers and operation of numbers
const displayNumberPresentation = document.querySelector('.display-number');
const displayOperationPresentation = document.querySelector('.stored-operation');

// Set up number buttons to update the displayNumber
const numericButton = document.querySelectorAll('.numeric-button');
for (let i = 0; i < numericButton.length; i++) {
    let numericButtonItem = numericButton[i];
    numericButtonItem.addEventListener('click', () => {
        if (refreshKeyStroke){
            displayNumber = "0";
            refreshKeyStroke = false;
        }
        if (operatorCallLive) {
            displayNumber = "0";
            operatorCallLive = false;
            decimalPressedIndicator = false;
            firstOperationCall = false;
        }
        displayNumber = displayNumber + numericButtonItem.innerText;
        if (displayNumber[0] == "0" && displayNumber[1] != "."){
            displayNumber = displayNumber.substr(1, displayNumber.length - 1);
        }
        displayNumberPresentation.innerHTML = Number(displayNumber);
        equalFirst = true
    });
};

// Set up decimal button functionality
//     Switch will flip to ensure the displayNumber is assembled correctly
const decimalButton = document.querySelector('.decimal-button');
decimalButton.addEventListener('click', () => {
    if (refreshKeyStroke){
        displayNumber = "0";
        refreshKeyStroke = false;
    }
    if (operatorCallLive) {
        displayNumber = "0";
        operatorCallLive = false;
        decimalPressedIndicator = false;
        firstOperationCall = false;
    }
    if (!decimalPressedIndicator) {
        displayNumber = displayNumber + ".";
        decimalPressedIndicator = true;
        displayNumberPresentation.innerHTML = displayNumber;
    }
    equalFirst = true
});

// Set up delete button functionality
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
    if (refreshKeyStroke){
        displayNumber = "0";
        refreshKeyStroke = false;
    }
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
});

// Set up +/- button functionality
const negButton = document.querySelector('.plus-minus');
negButton.addEventListener('click', () => {
    if (refreshKeyStroke){
        displayNumber = "0";
        refreshKeyStroke = false;
    }
    if (operatorCallLive) {
        displayNumber = "0";
        operatorCallLive = false;
        decimalPressedIndicator = false;
        firstOperationCall = false;
    }
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
    displayOperationPresentation.innerHTML = ""
    displayNumberPresentation.innerHTML = displayNumber;
});



// Set up equal button functionality
const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', () => {
    if (equalFirst && equalStart) {
        operandSecond = displayNumber;
        displayNumber = equate();
        displayOperationPresentation.innerHTML = operandFirst + " " + operationTask[operationIndex] + " " + operandSecond + " =";
        displayNumberPresentation.innerHTML = displayNumber;
        firstOperationCall = true;
        equalFirst = false;
    } else if (equalStart) {
        operandFirst = displayNumber;
        displayNumber = equate();
        displayOperationPresentation.innerHTML = operandFirst + " " + operationTask[operationIndex] + " " + operandSecond + " =";
        displayNumberPresentation.innerHTML = displayNumber;
        firstOperationCall = true;
    }
    refreshKeyStroke = true;
});

