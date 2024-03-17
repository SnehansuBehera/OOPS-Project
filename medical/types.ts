import { Disease, Remedy, Symptom } from "@prisma/client";

export type SymptomWithRemediesWithDisease = Symptom & {
    remedies: Remedy[];
    diseases: Disease[];
};
