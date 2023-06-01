// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  // const [result, setResult] = useState('');
  // const [operator, setOperator] = useState('');

  function clearInput() {
    setDisplay('0');
    setFormula('');
  }

  const restructurExpression = (expression: string) => {
    const array = expression.split(' ').join('').split('');
    const operators = ['+', '-', '*', '/'];
    console.log('array is ', array);

    const restructuredArray = [];

    for (let i = 0; i < array.length; i++) {
      const token = array[i];
      // let priority = token;
      if (operators.includes(token)) {
        // Check if the next token is also an operator
        const nextToken = array[i + 1];

        // const prevToken = array[i - 1];
        // if (prevToken && operators.includes(prevToken) && prevToken != '') {
        //   restructuredArray.pop();
        // }
        
        if (nextToken && nextToken != '-' && operators.includes(nextToken)) {
          // Consecutive operators found, skip the current one
          console.log('ne', token, nextToken);
          const lastElOfRestructured = restructuredArray[restructuredArray.length-1];
          if(operators.includes(lastElOfRestructured)){
            restructuredArray.pop()
          }

          continue;
        }
      }

      // if (priority) restructuredArray.push(priority);
      restructuredArray.push(token);
    }

    const restructuredExpression = restructuredArray.join('');
    return restructuredExpression;
  };

  const calculateResult = () => {
    if (formula.includes('=')) return;
    // const result = eval(formula);
    console.log(formula);
    // return;
    const ex = restructurExpression(formula);
    console.log('expresso', ex);

    const result = eval(ex);

    setDisplay(result + '');
    setFormula((prev) => prev + ' = ' + result);
  };
  function numberHandler(number: string) {
    if (!formula) {
      if (number === '.') number = '0.1';
      setFormula(number);
      setDisplay(number);
    } else if (formula[0] === '0' && number === '0') {
      return;
    } else if (formula.includes('=')) {
      setFormula(number);
      setDisplay(number);
    } else {
      setFormula(formula + number);
      setDisplay(display + number);
    }
  }
  function operatorHandler(operator: string) {
    if (formula.includes('=')) {
      setFormula(display + ' ' + operator + ' ');
      setDisplay(operator);
    } else {
      setDisplay(operator);
      setFormula(formula + ' ' + operator + ' ');
    }
  }
  function decimalHandler() {
    const array = formula.split(' ');
    const lastEl = array[array.length - 1];
    if (!lastEl.includes('.')) {
      setFormula(formula + '.');
      setDisplay(display + '.');
    }
  }

  return (
    <div className="container">
      <div className="screen">
        <p id="formulaScreen">{formula}</p>
        <p id="display">{display}</p>
      </div>
      <div className="keys_box">
        <input type="button" onClick={clearInput} id="clear" value="AC" />
        <input
          type="button"
          id="divide"
          value="/"
          onClick={() => operatorHandler('/')}
        />
        <input
          type="button"
          id="multiply"
          value="X"
          onClick={() => operatorHandler('*')}
        />

        <input
          type="button"
          value="7"
          id="seven"
          onClick={() => numberHandler('7')}
        />
        <input
          type="button"
          value="8"
          id="eight"
          onClick={() => numberHandler('8')}
        />
        <input
          type="button"
          value="9"
          id="nine"
          onClick={() => numberHandler('9')}
        />
        <input
          type="button"
          id="subtract"
          value="-"
          onClick={() => operatorHandler('-')}
        />

        <input
          type="button"
          value="4"
          id="four"
          onClick={() => numberHandler('4')}
        />

        <input
          type="button"
          value="5"
          id="five"
          onClick={() => numberHandler('5')}
        />
        <input
          type="button"
          value="6"
          id="six"
          onClick={() => numberHandler('6')}
        />
        <input
          type="button"
          id="add"
          value="+"
          onClick={() => operatorHandler('+')}
        />

        <input
          type="button"
          value="1"
          id="one"
          onClick={() => numberHandler('1')}
        />
        <input
          type="button"
          value="2"
          id="two"
          onClick={() => numberHandler('2')}
        />
        <input
          type="button"
          value="3"
          id="three"
          onClick={() => numberHandler('3')}
        />
        <input
          type="button"
          id="zero"
          value="0"
          onClick={() => numberHandler('0')}
        />
        <input type="button" id="decimal" value="." onClick={decimalHandler} />
        <input type="button" id="equals" value="=" onClick={calculateResult} />
      </div>
    </div>
  );
}

export default App;
