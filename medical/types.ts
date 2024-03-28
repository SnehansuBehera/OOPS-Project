import { Disease, LookListenFeel, Member, Profile, Question, Remedy, SubQuestion, Symptom } from "@prisma/client";

export type SymptomWithRemediesWithDisease = Symptom & {
    remedies: Remedy[];
    diseases: Disease[];
};
<<<<<<< HEAD
export type MembersWithProfiles =
    Member & { profile: Profile }[];
=======
export type QuestionWithSubQuestionWithLookListenFeel=Question&{
    subquestions:SubQuestion[];
    looklistens:LookListenFeel[];
}
export type MembersWithProfiles=
    Member&{profile:Profile}[];
>>>>>>> upstream/main
