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
        if (set.reps.achievedReps) achieved += `${set.reps.achievedReps}`
        if (set.load && set.load.achievedLoad) achieved += `X${set.load.achievedLoad.value}${set.load.achievedLoad.unit[0]}`
    }
    return {id: set.id, target: target, achieved: achieved}
}

export function stringToExerciseSet(id: string, target: string, achieved: string): ExerciseSet {
    let set: ExerciseSet = {
        id: id,
        reps: {
            targetRepsLowerBound: null,
            targetRepsUpperBound: null,
            asManyAsPossible: false,
            achievedReps: null,
        },
        load: {
            targetLoad: {
                scheme: 'RPE',
                percentage: null,
                rpe: null,
                weight: null,
            },
            achievedLoad: null,
        },
        completedAt: null,
    }
    let targetReps = target.match(/(\d+)-?(\d+)?\+?/)
    if (targetReps) {
        set.reps.targetRepsLowerBound = parseInt(targetReps[1])
        set.reps.targetRepsUpperBound = targetReps[2] ? parseInt(targetReps[2]) : null
        set.reps.asManyAsPossible = targetReps[0].endsWith("+")
    }
    let targetLoad = target.match(/R(\d*(\.\d+)?)|X(\d+)%|X(\d+)(K|L)/)
    if (targetLoad) {
        if (targetLoad[1]) {
            set.load.targetLoad.scheme = 'RPE'
            set.load.targetLoad.rpe = parseFloat(targetLoad[1])
        } else if (targetLoad[2]) {
            set.load.targetLoad.scheme = 'PERCENTAGE'
            set.load.targetLoad.percentage = parseInt(targetLoad[2])
        } else if (targetLoad[3]) {
            set.load.targetLoad.scheme = 'WEIGHT'
            set.load.targetLoad.weight = {
                value: parseInt(targetLoad[3]),
                unit: targetLoad[4] as 'KG' | 'LB',
            }
        }
    }

    let achievedReps = achieved.match(/(\d+)/)
    if (achievedReps) {
        set.reps.achievedReps = parseInt(achievedReps[1])
    }
    let achievedLoad = achieved.match(/X(\d+)(KG|LB)/)
    if (achievedLoad) {
        set.load.achievedLoad = {
            value: parseInt(achievedLoad[1]),
            unit: achievedLoad[2] as 'KG' | 'LB',
        }
    }
    return set
}