import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  input: string = '';
  readonly DIGITS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'];
  readonly OPERATORS = ['+', '-', '*', '/'];

  handleDigitClick(digit: number | string) {
    if (
      digit === '.' &&
      (!/\d$/gm.test(this.input) || /\d\.\d+$/gm.test(this.input))
    ) {
      return;
    }
    this.input += digit;
  }

  handleOperatorClick(operator: string) {
    if (operator === '/' || operator === '*') {
      this.input = this.input.replace(/\*|\/$/gm, operator);
      if (/\d$/gm.test(this.input)) this.input += operator;
    }

    if (operator === '-' || operator === '+') {
      if (!/\.$/gm.test(this.input)) this.input += operator;
    }
  }

  handleClearEntry() {
    if (isNaN(parseInt(this.input))) {
      this.input = '';
    } else {
      this.input = this.input.slice(0, -1);
    }
  }

  handleCalculate() {
    try {
      let sanitizedInput = this.input.replace(/(\d+(\.\d+)?)/g, (match) =>
        parseFloat(match).toString()
      );
      sanitizedInput = sanitizedInput.replace('--', '+');
      let calculatedResult = eval(sanitizedInput);
      calculatedResult = parseFloat(calculatedResult.toFixed(4));
      this.input = calculatedResult.toString();
    } catch (error) {
      this.input = 'Error';
    }
  }
}
