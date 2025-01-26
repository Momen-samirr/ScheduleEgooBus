"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function createBanner(title: string, imageString: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    const banner = await prisma.banner.create({
      data: {
        title,
        imageString,
      },
    });

    return { success: true, banner };
  } catch (error) {
    console.error("Failed to create banner:", error);
    return { success: false, error: "Failed to create banner" };
  }
}
