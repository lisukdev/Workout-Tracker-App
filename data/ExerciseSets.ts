export interface ExerciseSet {
    id: string;
    reps: {
        targetRepsLowerBound: number | null;
        targetRepsUpperBound: number | null;
        asManyAsPossible: boolean;
        achievedReps: number | null;
    } | null;

    load: {
        targetLoad: {
            scheme: 'RPE' | 'PERCENTAGE' | 'WEIGHT';
            percentage: number | null;
            rpe: number | null;
            weight: Weight | null;
        }
        achievedLoad: Weight | null;
    } | null;
    completedAt: string | null;
}
export interface Weight {
    value: number;
    unit: 'KG' | 'LB';
}

export function exerciseSetToString(set: ExerciseSet): {id: string, target: string, achieved: string} {
    let target = ""

    if (set.reps != null) {
        if (set.reps.targetRepsLowerBound) target += `${set.reps.targetRepsLowerBound}`
        if (set.reps.targetRepsUpperBound) target += `-${set.reps.targetRepsUpperBound}`
        if (set.reps.asManyAsPossible) target += "+"
        if (set.load && set.load.targetLoad) {
            switch (set.load.targetLoad.scheme) {
                case 'RPE':
                    target += `R${set.load.targetLoad.rpe}`
                    break;
                case 'PERCENTAGE':
                    target += `X${set.load.targetLoad.percentage}%`
                    break;
                case 'WEIGHT':
                    target += `X${set.load.targetLoad.weight.value}${set.load.targetLoad.weight.unit[0]}`
                    break;
            }
        }
    }

    let achieved = ""
    if (set.reps != null) {
        if (set.load && set.load.achievedLoad) achieved += `${set.load.achievedLoad.value}${set.load.achievedLoad.unit[0]}`
        if (set.reps.achievedReps) achieved += `X${set.reps.achievedReps}`
    }
    return {id: set.id, target: target, achieved: achieved}
}

const RPE = "R(?:1|2|3|4|5|6|7|8|9|10)(?:.5)?"
const PERCENTAGE = "(?:100|0|[1-9][0-9]?)%"
const WEIGHT = "(?:[0-9]*)(?:\\.[0-9]*)?(?:K|L)?"
const LOADS = `(?<RPE>${RPE})|(?<PERCENTAGE>${PERCENTAGE})|(?<WEIGHT>${WEIGHT})`;
const TARGET_REPS = "(?:\\+?|[0-9]+\\+?|[0-9]+-([0-9]+\\+?)?)"
export const TARGET_REGEX = new RegExp(`^(?:${LOADS})X(?<REPS>${TARGET_REPS})$`)
export const ACHIEVED_REGEX = new RegExp(`^(?<WEIGHT>${WEIGHT})X(?<REPS>[0-9]+)(?<SENTIMENT>[+-]?)$`)


const RPE_PREFIX = "R((1|2|3|4|5|6|7|8|9|10)(\\.5?)?)?"
const PERCENTAGE_PREFIX = `(100|[1-9][0-9]?)%`;
const WEIGHT_PREFIX = `[0-9]*(\\.[0-9]*)?[KL]?`;
const LOAD_PREFIX = `(${RPE_PREFIX}|${PERCENTAGE_PREFIX}|${WEIGHT_PREFIX})`
const TARGET_REPS_PREFIX = "(\\+?|[0-9]+\\+?|[0-9]+-([0-9]+\\+?)?)"
export const TARGET_REGEX_PREFIX = new RegExp(`^((${LOAD_PREFIX})(X(${TARGET_REPS_PREFIX})?)?)?$`)
export const ACHIEVED_REGEX_PREFIX = new RegExp(`^((${WEIGHT_PREFIX})(X([0-9]+)?)?)?$`)
