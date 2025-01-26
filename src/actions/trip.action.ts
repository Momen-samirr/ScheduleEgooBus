import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createTrips(name: string, date: string, time: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    const trip = await prisma.trip.create({
      data: {
        authorId: userId,
        name,
        date,
        time,
      },
    });
    revalidatePath("/dashboard/trips");
    return { success: true, trip };
  } catch (error) {}
}
