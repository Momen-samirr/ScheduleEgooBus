"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function getNotifications() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    const notifications = await prisma.egooNotification.findMany({
      where: {
        userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            phone: true,
            image: true,
          },
        },
        task: {
          select: {
            id: true,
            content: true,
            image: true,
            comments: {
              select: {
                id: true,
                authorId: true,
                createdAt: true,
                content: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            authorId: true,
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

export async function getUnReadEgooNotifications() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    const unReadNotificatons = await prisma.egooNotification.findMany({
      where: {
        userId,
        read: false,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            phone: true,
            image: true,
          },
        },
      },
    });
    return unReadNotificatons;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

export async function markNotificationsAsRead(notificationIds: string[]) {
  try {
    await prisma.egooNotification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return { success: false };
  }
}
