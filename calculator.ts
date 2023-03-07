type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

const num1: number = 3;
const num2: number = 0;
const operation: Operation = "divide";

try {
  const returnValue = calculator(num1, num2, operation);
  console.log(`The result of operation '${operation}' for numbers ${num1} and ${num2} is ${returnValue}`);
} catch (err: unknown) {
  let errorMessage = 'Something went wrong: '
  if (err instanceof Error) {
    errorMessage += err.message;
  }
  console.log(errorMessage);
}