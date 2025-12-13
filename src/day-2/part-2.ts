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
    for (let id = range.start; id <= range.end; id++) {
        const idStr = id.toString();
        const idLen = idStr.length;
        for (let i = 2; i <= idLen; i++) {
            if (idLen % i !== 0) { // not divisible by i
                continue;
            }
            const sliceLen = idLen/i;
            const firstSlice = idStr.slice(0, sliceLen);
            let slicesMatch = true;
            for (let j = 1; j < i; j++) {
                if (idStr.slice(j*sliceLen, (j+1)*sliceLen) !== firstSlice) {
                    slicesMatch = false;
                    break;
                }
            }
            if (slicesMatch) {
                idSum += id;
                break;
            }
        }
    }
}

// Output
console.log(`Sum of invalid IDs is ${idSum}`);