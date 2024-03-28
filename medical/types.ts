import { Disease, Member, Profile, Remedy, Symptom } from "@prisma/client";

export type SymptomWithRemediesWithDisease = Symptom & {
    remedies: Remedy[];
    diseases: Disease[];
};
export type MembersWithProfiles =
    Member & { profile: Profile }[];
