// Set up the first operand and second operand
let operandFirst = 0;
let operandSecond = 0;

// Set up display number as you type digits
// Only allow for a single decimal to be pressed
let displayNumber = "0";
let decimalPressedIndicator = false;

// Query HTML to display the numbers and operation of numbers
const displayNumberPresentation = document.querySelector('.display-number');
const displayOperationPresentation = document.querySelector('.stored-operation');

// Set up number buttons to update the displayNumber
const numericButton = document.querySelectorAll('.numeric-button');
for (let i = 0; i < numericButton.length; i++) {
    let numericButtonItem = numericButton[i];
    numericButtonItem.addEventListener('click', () => {
        displayNumber = displayNumber + numericButtonItem.innerText;
        if (displayNumber[0] == "0" && displayNumber[1] != "."){
            displayNumber = displayNumber.substr(1, displayNumber.length - 1);
        }
        displayNumberPresentation.innerHTML = Number(displayNumber);
    });
};

// Set up decimal button functionality
//     Switch will flip to ensure the displayNumber is assembled correctly
const decimalButton = document.querySelector('.decimal-button');
decimalButton.addEventListener('click', () => {
    if (!decimalPressedIndicator) {
        displayNumber = displayNumber + ".";
        decimalPressedIndicator = true;
        displayNumberPresentation.innerHTML = displayNumber;
    }
});

// Set up delete button functionality
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
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
});

// Set up +/- button functionality
const negButton = document.querySelector('.plus-minus');
negButton.addEventListener('click', () => {
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
});