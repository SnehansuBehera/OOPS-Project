import { Disease, LookListenFeel, Member, Profile, Question, Remedy, SubQuestion, Symptom } from "@prisma/client";

export type SymptomWithRemediesWithDisease = Symptom & {
    remedies: Remedy[];
    diseases: Disease[];
};
export type QuestionWithSubQuestionWithLookListenFeel = Question & {
    subquestions: SubQuestion[];
    looklistens: LookListenFeel[];
}
export type MembersWithProfiles =
    Member & { profile: Profile }[];
