const getElement = id => document.getElementById(id);

class Operand {
  naturalPart = 0;
  decimalPart = 0;
  isFloat = false;
  constructor(number) {
    if (number) {
      this.naturalPart = number;
    }
  }
  appendNumber(number) {
    if (this.isFloat) {
      this.decimalPart = this.decimalPart * 10 + number;
    } else {
      this.naturalPart = this.naturalPart * 10 + number;
    }
  }

  toDecimal() {
    console.log("to decimal");

    this.isFloat = true;
  }

  getOperandAsFloat() {
    let temp = `${this.naturalPart}`;
    if (this.isFloat) {
      temp = `${temp}.${this.decimalPart}`;
    }
    return parseFloat(temp);
  }

  setValueFromFloat(number) {
    this.naturalPart = parseInt(number);
    let tempDecimal = number - this.naturalPart;
    if (tempDecimal !== 0) {
      do {
        tempDecimal = tempDecimal * 10;
      } while (tempDecimal - parseInt(tempDecimal) !== 0);
    }
    this.decimalPart = tempDecimal;
    this.isFloat = true;
  }
}

const n1 = getElement("n1");
const n2 = getElement("n2");
const n3 = getElement("n3");
const n4 = getElement("n4");
const n5 = getElement("n5");
const n6 = getElement("n6");
const n7 = getElement("n7");
const n8 = getElement("n8");
const n9 = getElement("n9");
const n0 = getElement("n0");
const clear = getElement("clear");
const point = getElement("point");

const equal = getElement("equal");

const result = getElement("result");

const plus = getElement("plus");
const minus = getElement("minus");
const multiply = getElement("multiply");
const divide = getElement("divide");

let firstOperand = null;
let secondOperand = null;
let operation = null;
let typingValue = "";

const numberClicked = e => {
  switch (e.target.id) {
    case "n1": {
      numberTapped(1);
      break;
    }
    case "n2": {
      numberTapped(2);
      break;
    }
    case "n3": {
      numberTapped(3);
      break;
    }
    case "n4": {
      numberTapped(4);
      break;
    }
    case "n5": {
      numberTapped(5);
      break;
    }
    case "n6": {
      numberTapped(6);
      break;
    }
    case "n7": {
      numberTapped(7);
      break;
    }
    case "n8": {
      numberTapped(8);
      break;
    }
    case "n9": {
      numberTapped(9);
      break;
    }
    case "n0": {
      numberTapped(0);
      break;
    }
    default: {
      break;
    }
  }
};

const numberTapped = number => {
  if (operation === null) {
    try {
      firstOperand.appendNumber(number);
    } catch {
      firstOperand = new Operand(number);
    }
    result.value = firstOperand.getOperandAsFloat();
  } else {
    try {
      secondOperand.appendNumber(number);
    } catch {
      secondOperand = new Operand(number);
    }
    result.value = secondOperand.getOperandAsFloat();
  }
};

const operationClicked = e => {
  if (firstOperand === null) return;
  if (operation !== null) {
    doCalcAndClear();
  }
  operation = e.target.id;
  result.value = firstOperand.getOperandAsFloat();
};

const doCalcAndClear = () => {
  if (secondOperand === null || operation === null) return;
  switch (operation) {
    case "plus": {
      firstOperand.setValueFromFloat(
        firstOperand.getOperandAsFloat() + secondOperand.getOperandAsFloat()
      );
      break;
    }
    case "minus": {
      firstOperand.setValueFromFloat(
        firstOperand.getOperandAsFloat() - secondOperand.getOperandAsFloat()
      );
      break;
    }
    case "multiply": {
      firstOperand.setValueFromFloat(
        firstOperand.getOperandAsFloat() * secondOperand.getOperandAsFloat()
      );
      break;
    }
    case "divide": {
      try {
        firstOperand.setValueFromFloat(
          firstOperand.getOperandAsFloat() / secondOperand.getOperandAsFloat()
        );
      } catch {
        secondOperand = null;
      }
      break;
    }
  }
  operation = null;
  secondOperand = null;
  result.value = firstOperand.getOperandAsFloat();
};

document.querySelectorAll("#numbers > div").forEach(Element => {
  Element.addEventListener("click", numberClicked);
});
document.querySelectorAll("#operations > div").forEach(Element => {
  Element.addEventListener("click", operationClicked);
});

document
  .querySelector("#equal")
  .addEventListener("click", () => doCalcAndClear());

document.querySelector("#clear").addEventListener("click", () => {
  firstOperand = null;
  secondOperand = null;
  operation = null;
  result.value = "";
});

document.getElementById("point").addEventListener("click", () => {
  if (operation === null) {
    if (!firstOperand) firstOperand = new Operand(0);
    firstOperand.toDecimal();
  } else {
    if (!secondOperand) secondOperand = new Operand(0);
    secondOperand.toDecimal();
  }
});
