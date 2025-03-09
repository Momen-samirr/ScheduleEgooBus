"use server";

import prisma from "@/lib/prisma";
import { getDbUser, getDbUserId } from "./user.action";

export async function getNotifications() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    const notifications = await prisma.notification.findMany({
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
        post: {
          select: {
            id: true,
            trips: true,
            tableCode: true,
            tripMode: true,
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

export async function getUnReadNotifications() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    const user = await getDbUser();

    const userNotifications = await prisma.notification.findMany({
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

    return userNotifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

export async function markNotificationsAsRead(notificationIds: string[]) {
  try {
    await prisma.notification.updateMany({
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
