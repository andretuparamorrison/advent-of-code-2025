import * as fs from 'fs';

// Constants
const DIAL_MIN = 0;
const DIAL_MAX = 99;
const DIAL_START = 50;
const DIAL_TARGET = 0;

// Input
const input = fs.readFileSync("input/day-1-input.txt", { encoding: 'utf8' })
    .split("\n")
    .filter(x => x !== "")
    .map(turnString => {
        const directionLetter = turnString.at(0);
        let direction: "left" | "right";
        switch (directionLetter) {
        case "L":
            direction = "left";
            break;
        case "R":
            direction = "right";
            break;
        default:
            throw new Error(`Unknown direction: ${directionLetter}`);
        }
        const distance = parseInt(turnString.slice(1));
        if (Number.isNaN(distance)) {
            throw new Error(`Unable to parse distance: ${distance}`);
        }
        return { direction, distance };
    });

// Processing
let dialPosition = DIAL_START;
let targetCounter = 0;
for (const turn of input) {
    const step = turn.direction === "left" ? -1 : 1;
    for (let i = 0; i < turn.distance; i++) {
        dialPosition += step;
        if (dialPosition === DIAL_MIN - 1) {
            dialPosition = DIAL_MAX;
        }
        else if (dialPosition === DIAL_MAX + 1) {
            dialPosition = DIAL_MIN;
        }
        if (dialPosition === DIAL_TARGET) {
            targetCounter++;
        }
    }
}

// Output
console.log(`Dial pointed at target ${targetCounter} times.`);