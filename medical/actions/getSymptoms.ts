import { db } from "@/lib/db";
import { Symptom } from "@prisma/client";

const getSymptoms = async (): Promise<Symptom[]> => {
  const symptoms = await db.symptom.findMany({
    include: {
      remedies: true,
      diseases: true,
    },
    orderBy: {
      createdAt: 'desc', // or any other field you want to order by
    },
  });
  return symptoms;
};

export default getSymptoms;
