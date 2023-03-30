import {ACHIEVED_REGEX, ACHIEVED_REGEX_PREFIX, TARGET_REGEX, TARGET_REGEX_PREFIX} from "./ExerciseSets";
import expect from "expect";

const validRpe = [
    'R1', 'R1.5', 'R2', 'R2.5', 'R3', 'R3.5', 'R4', 'R4.5', 'R5',
    'R5.5', 'R6', 'R6.5', 'R7', 'R7.5', 'R8', 'R8.5', 'R9', 'R9.5', 'R10'
];
const validPercentages = ['1%', '5%', '10%', '33%', '50%', '69%', '75%', '80%', '90%', '95%', '100%'];
const validWeights = ['.25', '0.25', '0', '1', '5', '10.25', '75', '80.0', '90', '200.322', '300', '355', '575'];
const validKilos = validWeights.map((x) => `${x}K`)
const validPounds = validWeights.map((x) => `${x}L`)
const validLoads = [...validRpe, ...validPercentages, ...validWeights, ...validKilos, ...validPounds]
const validTargetReps = ['1', '5', '10', '+', '1-10', '3-5+', '5+']
const validAchievedReps = ['1', '5', '10']

const target_examples  = [];
for (const load of validLoads) {
    for (const reps of validTargetReps) {
        target_examples.push(`${load}X${reps}`)
    }
}

const achieved_examples = [];
for (const weight of validWeights) {
    for (const reps of validAchievedReps) {
        target_examples.push(`${weight}X${reps}`)
        target_examples.push(`${weight}X${reps}-`)
        target_examples.push(`${weight}X${reps}+`)
    }
}
test('Ensure target regex extracts fields for rpe examples', () => {
    for (const rpe of validRpe) {
        for (const reps of validTargetReps) {
            const example = `${rpe}X${reps}`;
            const match = TARGET_REGEX.exec(example);
            expect(match.groups.RPE).toEqual(rpe);
            expect(match.groups.REPS).toEqual(reps);
        }
    }
});

test('Ensure target regex extracts fields for percentage examples', () => {
    for (const percentage of validPercentages) {
        for (const reps of validTargetReps) {
            const example = `${percentage}X${reps}`;
            const match = TARGET_REGEX.exec(example);
            expect(match.groups.PERCENTAGE).toEqual(percentage);
            expect(match.groups.REPS).toEqual(reps);
        }
    }
});

test('Ensure target regex extracts fields for weight examples.', () => {
    for (const weight of validWeights) {
        for (const reps of validTargetReps) {
            const example = `${weight}X${reps}`;
            const match = TARGET_REGEX.exec(example);
            expect(match.groups.WEIGHT).toEqual(weight);
            expect(match.groups.REPS).toEqual(reps);
        }
    }
});

test('Ensure achieved regex extracts fields for weight examples.', () => {
    for (const weight of validWeights) {
        for (const reps of validAchievedReps) {
            for (const sentiment of ['+', '-', '']) {
                const example = `${weight}X${reps}${sentiment}`;
                const match = ACHIEVED_REGEX.exec(example);
                expect(match).toBeTruthy()
                expect(match[0]).toEqual(example);
                expect(match[1]).toEqual(weight);
                expect(match[2]).toEqual(reps);
                expect(match[3]).toEqual(sentiment);
                expect(match.groups).toBeDefined();
                expect(match.groups.WEIGHT).toEqual(weight);
                expect(match.groups.REPS).toEqual(reps);
                expect(match.groups.SENTIMENT).toEqual(sentiment);
            }
        }
    }
});

test('Ensure target regexes work for all valid examples', () => {
    expect(target_examples.filter((example) => !TARGET_REGEX.test(example))).toEqual([]);
    expect(target_examples.filter((example) => !TARGET_REGEX_PREFIX.test(example))).toEqual([]);
});

test('Ensure target prefix regex works for all example prefixes', () => {
    const prefixes = new Set();
    for (const example of target_examples) {
        for (let i = 0; i < example.length; i++) {
            prefixes.add(example.substring(0, i));
        }
    }
    expect([...prefixes].filter((prefix) => !TARGET_REGEX_PREFIX.test(prefix))).toEqual([]);
})

test('Ensure achived regexes work for all valid examples', () => {
    expect(achieved_examples.filter((example) => !ACHIEVED_REGEX.test(example))).toEqual([]);
    expect(achieved_examples.filter((example) => !ACHIEVED_REGEX_PREFIX.test(example))).toEqual([]);
})
test('Ensure achieved regexes work for all example prefixes', () => {
    const prefixes = new Set();
    for (const example of achieved_examples) {
        for (let i = 0; i < example.length; i++) {
            prefixes.add(example.substring(0, i));
        }
    }
    expect([...prefixes].filter((prefix) => !ACHIEVED_REGEX_PREFIX.test(prefix))).toEqual([]);
})