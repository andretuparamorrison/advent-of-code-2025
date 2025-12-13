import * as fs from 'fs';

// Constants

// Input
const [rangesInput, ingredientsInput] = fs.readFileSync("input/day-5-input.txt", { encoding: 'utf8' })
    .split("\n\n")
    .map(x => x.split("\n").filter(i => i !== ""));
const ranges = rangesInput.map(rangeStr => {
    const [startStr, endStr] = rangeStr.split("-");
    const [start, end] = [startStr, endStr].map(x => parseInt(x));
    if (Number.isNaN(start)) {
        throw new Error(`Invalid range start: ${startStr}`);
    }
    if (Number.isNaN(end)) {
        throw new Error(`Invalid range end: ${endStr}`);
    }
    if (start > end) {
        throw new Error(`Invalid range: ${rangeStr}`)
    }
    return { start, end };
});
const ingredients = ingredientsInput.map(x => {
    const ingredient = parseInt(x);
    if (Number.isNaN(ingredient)) {
        throw new Error(`Invalid ingredient: ${x}`);
    }
    return ingredient;
});

// Processing
let numFresh = 0;
for (const ingredient of ingredients) {
    let isFresh = false;
    for (const range of ranges) {
        if (range.start <= ingredient && ingredient <= range.end) {
            isFresh = true;
            break;
        }
    }
    if (isFresh) {
        numFresh++;
    }
}

// Output
console.log(`Number of fresh ingredients: ${numFresh}`);