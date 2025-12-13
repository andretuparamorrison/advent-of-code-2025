import * as fs from 'fs';

const NUM_BATT_TO_TURN_ON = 12;

// Input
const input = fs.readFileSync("input/day-3-input.txt", { encoding: 'utf8' })
    .split("\n")
    .filter(x => x !== "")
    .map(bankString => bankString.split(""));

// Processing
let totalJoltage = 0;
for (const bank of input) {
    let batteries: { joltage: number, index: number }[] = [];
    for (let i = NUM_BATT_TO_TURN_ON - 1; i >= 0; i--) {
        const lastBatteryIndex = batteries.at(-1)?.index;
        const bankSliceStart = lastBatteryIndex === undefined ? 0 : lastBatteryIndex + 1;
        const bankSlice = bank.slice(bankSliceStart, bank.length - i);
        const maxBattery = bankSlice
            .map((b,index) => ({ joltage: parseInt(b), index: index + bankSliceStart }))
            .sort((a,b) => {
                if (a.joltage < b.joltage) {
                    return -1;
                }
                else if (a.joltage > b.joltage) {
                    return 1;
                }
                else if (a.index < b.index) {
                    return 1;
                }
                else if (a.index > b.index) {
                    return -1
                }
                else {
                    throw new Error(`Two batteries with same index: ${a.index}`)
                }
            })
            .at(-1);
        if (!maxBattery) {
             throw new Error(`No batteries in bank slice: ${lastBatteryIndex}-${bank.length - i}`);
        }
        batteries.push(maxBattery);
    }
    const joltageString = batteries.map(b => b.joltage.toString()).join('');
    const joltage = parseInt(joltageString);
    if (Number.isNaN(joltage)) {
        throw new Error(`Invalid joltage string: ${joltageString}`);
    }
    console.log(`Joltage for bank ${bank}: ${joltage}`)
    totalJoltage += joltage;
}

// Output
console.log(`Total output joltage: ${totalJoltage}`);