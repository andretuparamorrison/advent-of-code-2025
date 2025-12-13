import * as fs from 'fs';

// Constants
const MAX_ADJACENT_ROLLS = 3;

// Input
const input = fs.readFileSync("input/day-4-example.txt", { encoding: 'utf8' })
    .split("\n")
    .filter(x => x !== "")
    .map(row => row
        .split("")
        .map(char => {
            switch (char) {
            case "@":
                return true;
            case ".":
                return false;
            default:
                throw new Error(`Invalid character: ${char}`);
            }
        })
    );

// Processing
let rollCount = 0;
let newRolls: number;
do {
    newRolls = 0;
    for (const [rowIndex, row] of input.entries()) {
        for (const [columnIndex, isRoll] of row.entries()) {
            if (!isRoll) {
                continue;
            }
            const neighbours: boolean[] = [];
            if (rowIndex > 0) {
                // Top-left
                if (columnIndex > 0) {
                    neighbours.push(input[rowIndex-1][columnIndex-1]);
                }
                // Top-centre
                neighbours.push(input[rowIndex-1][columnIndex]);
                // Top-right
                if (columnIndex < row.length - 1) {
                    neighbours.push(input[rowIndex-1][columnIndex+1])
                }
            }
            // Centre-left
            if (columnIndex > 0) {
                neighbours.push(input[rowIndex][columnIndex-1]);
            }
            // Centre-right
            if (columnIndex < row.length - 1) {
                neighbours.push(input[rowIndex][columnIndex+1])
            }
            if (rowIndex < input.length - 1) {
                // Bottom-left
                if (columnIndex > 0) {
                    neighbours.push(input[rowIndex+1][columnIndex-1]);
                }
                // Bottom-centre
                neighbours.push(input[rowIndex+1][columnIndex]);
                // Bottom-right
                if (columnIndex < row.length - 1) {
                    neighbours.push(input[rowIndex+1][columnIndex+1])
                }
            }
            if (neighbours.filter(x => x).length <= MAX_ADJACENT_ROLLS) {
                newRolls++;
                input[rowIndex][columnIndex] = false;
            }
        }        
    }
    rollCount += newRolls;
}
while (newRolls !== 0)

// Output
console.log(`Number of rolls that can be accessed: ${rollCount}`);