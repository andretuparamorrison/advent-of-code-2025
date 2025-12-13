import * as fs from 'fs';

// Input
const input = fs.readFileSync("input/day-6-input.txt", { encoding: 'utf8' })
    .split("\n")
    .map(x => x.split(""))
    .filter(x => x.length);
const rotatedInput: string[] = [];
const inputRowWidth = input[0].length;
for (const row of input) {
    if (row.length !== inputRowWidth) {
        throw new Error(`Row has invalid length: ${row.length}`);
    }
}
for (let i = inputRowWidth - 1; i >= 0; i--) {
    let rotatedColumn = "";
    for (let j = 0; j < input.length - 1; j++) {
        rotatedColumn += input[j][i];
    }
    rotatedInput.push(rotatedColumn.trim());
}
const problems = rotatedInput.join("\n").split("\n\n").map((x,i) => x.split("\n"));
const operationRowArray = input.at(-1);
if (!operationRowArray) {
    throw new Error("Invalid input, no rows.");
}
const operationRow = operationRowArray.filter(x => ![""," "].includes(x));

// Processing
let total = 0;
for (const [index, problem] of problems.entries()) {
    const operands: number[] = [];
    for (const operandStr of problem) {
        const operand = parseInt(operandStr);
        if (Number.isNaN(operand)) {
            throw new Error(`Invalid operand: ${operandStr}`);
        }
        operands.push(operand);
    }
    console.log(`Operands: ${operands}`);
    const operator = operationRow.at(-(index+1));
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