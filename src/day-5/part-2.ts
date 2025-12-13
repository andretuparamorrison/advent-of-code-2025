import * as fs from 'fs';

// Constants

// Input
const rangesInput = fs.readFileSync("input/day-5-input.txt", { encoding: 'utf8' })
    .split("\n\n")
    .at(0)!
    .split("\n")
    .filter(i => i !== "");
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

// Processing
ranges.sort((a,b) => {
    if (a.start < b.start) {
        return -1;
    }
    else if (a.start > b.start) {
        return 1;
    }
    else if (a.end < b.end) {
        return -1;
    }
    else if (a.end > b.end) {
        return 1;
    }
    else {
        return 0;
    }
});
const consolidatedRanges: { start: number, end: number }[] = [];
for (const range of ranges) {
    const lastConsolidatedRange = consolidatedRanges.at(-1);
    if (lastConsolidatedRange && lastConsolidatedRange.start <= range.start && range.start <= lastConsolidatedRange.end) {
        lastConsolidatedRange.end = Math.max(range.end, lastConsolidatedRange.end);
    }
    else {
        consolidatedRanges.push(range)
    }
}
let numFresh = 0;
for (const range of consolidatedRanges) {
    numFresh += range.end - range.start + 1;
}

// Output
console.log(`Number of fresh ingredients: ${numFresh}`);