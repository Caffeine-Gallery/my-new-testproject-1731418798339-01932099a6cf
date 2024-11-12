import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let currentValue = '';
let storedValue = null;
let currentOperation = null;

window.appendToDisplay = (value) => {
    currentValue += value;
    display.value = currentValue;
};

window.clearDisplay = () => {
    currentValue = '';
    storedValue = null;
    currentOperation = null;
    display.value = '';
};

window.setOperation = (operation) => {
    if (currentValue !== '') {
        if (storedValue !== null) {
            calculate();
        } else {
            storedValue = parseFloat(currentValue);
            currentValue = '';
        }
        currentOperation = operation;
    }
};

window.calculate = async () => {
    if (storedValue !== null && currentValue !== '' && currentOperation !== null) {
        const value1 = storedValue;
        const value2 = parseFloat(currentValue);
        let result;

        display.value = 'Calculating...';

        try {
            switch (currentOperation) {
                case '+':
                    result = await backend.add(value1, value2);
                    break;
                case '-':
                    result = await backend.subtract(value1, value2);
                    break;
                case '*':
                    result = await backend.multiply(value1, value2);
                    break;
                case '/':
                    const divisionResult = await backend.divide(value1, value2);
                    result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
                    break;
            }

            display.value = result;
            currentValue = result.toString();
            storedValue = null;
            currentOperation = null;
        } catch (error) {
            console.error('Error during calculation:', error);
            display.value = 'Error';
        }
    }
};
