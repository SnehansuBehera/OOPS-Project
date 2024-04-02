import { Disease, LookListenFeel, Member, Profile, Question, Remedy, SubQuestion, Symptom,Bacteria_Jaundice,Classify} from "@prisma/client";

export type SymptomWithRemediesWithDisease = Symptom & {
    remedies: Remedy[];
    diseases: Disease[];
};
export  type Bacteria_JaundiceWithClassify=Bacteria_Jaundice&{
    classify:Classify[]
};
export type QuestionWithSubQuestionWithLookListenFeel = Question & {
    subquestions: SubQuestion[];
    looklistens: LookListenFeel[];
}
export type MembersWithProfiles =
    Member & { profile: Profile }[];
