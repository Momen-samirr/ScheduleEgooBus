"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function getTrips() {
  try {
    const trips = await prisma.post.findMany();

    return trips;
  } catch (error) {
    console.error("Failed to get trips:", error);
    return error;
  }
}
