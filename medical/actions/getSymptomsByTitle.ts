import { Symptom } from "@prisma/client";
import getSymptoms from "./getSymptoms";
import { db } from "@/lib/db";

const getSymptomsByTitle = async (title: string): Promise<Symptom[]> => {
  if (!title) {
    return await getSymptoms();
  }

  const symptoms = await db.symptom.findMany({
    where: {
      name: {
        startsWith: title,
        mode: "insensitive", // Case-insensitive search
      },
    },
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

export default getSymptomsByTitle;
