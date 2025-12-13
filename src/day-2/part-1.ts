import * as fs from 'fs';

// Input
const input = fs.readFileSync("input/day-2-input.txt", { encoding: 'utf8' })
    .split(",")
    .map(rangeString => {
        const [startStr, endStr] = rangeString.split("-");
        const [start, end] = [startStr, endStr].map(x => parseInt(x));
        if (Number.isNaN(start)) {
            throw new Error(`Invalid range start: ${startStr}`);
        }
        if (Number.isNaN(end)) {
            throw new Error(`Invalid range end: ${endStr}`);
        }
        return { start, end };
    });

// Processing
let idSum = 0;
for (const range of input) {
    for (let i = range.start; i <= range.end; i++) {
        const id = i.toString();
        if (id.length % 2 !== 0) { // not even
            continue;
        }
        if (id.slice(0, id.length/2) !== id.slice(id.length/2)) {
            continue;
        }
        idSum += i;
    }
}

// Output
console.log(`Sum of invalid IDs is ${idSum}.`);