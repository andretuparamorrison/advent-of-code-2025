import * as fs from 'fs';

// Input
const input = fs.readFileSync("input/day-6-input.txt", { encoding: 'utf8' })
    .split("\n")
    .map(x => x.split(" ").filter(i => i !== ""))
    .filter(x => x.length !== 0);

// Processing
const rowWidth = input[0].length;
for (const row of input) {
    if (row.length !== rowWidth) {
        throw new Error(`Row has invalid length: ${row.length}`);
    }
}
const operationRow = input.at(-1);
if (!operationRow) {
    throw new Error("Invalid input, no rows.");
}
let total = 0;
for (let i = 0; i < rowWidth; i++) {
    const operands: number[] = [];
    for (let j = 0; j < input.length - 1; j++) {
        const operand = parseInt(input[j][i]);
        if (Number.isNaN(operand)) {
            throw new Error(`Invalid operand: ${input[i][j]}`);
        }
        operands.push(operand);
    }
    console.log(`Operands: ${operands}`);
    const operator = operationRow[i];
    console.log(`Operator: ${operator}`);
    let subTotal: number;
    switch (operator) {
    case "+":
        subTotal = 0; // Additive identity (x+0=x)
        break;
    case "*":
        subTotal = 1; // Multiplicative identity (x*1=x)
        break;
    default:
        throw new Error(`Invalid operator: ${operator}`);
    }
    for (const operand of operands) {        
        switch (operator) {
        case "+":
            subTotal += operand;
            break;
        case "*":
            subTotal *= operand;
            break;
        default:
            throw new Error(`Invalid operator: ${operator}`);
        }
    }
    console.log(`Sub-total: ${subTotal}`);
    total += subTotal;
}

// Output
console.log(`Grand total: ${total}`);