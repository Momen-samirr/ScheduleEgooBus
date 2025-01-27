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

export async function getBanners() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return banners;
  } catch (error) {
    console.error("Failed to get banners:", error);
    return { error: "Failed to get banners" };
  }
}

export async function deleteBanner(bannerId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;
    await prisma.banner.delete({
      where: {
        id: bannerId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete banner:", error);
    return { success: false, error: "Failed to delete banner" };
  }
}
