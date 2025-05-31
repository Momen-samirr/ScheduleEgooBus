"use server";

import prisma from "@/lib/prisma";
import { getDbUser, getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createTask(content: string, image: string) {
  try {
    const dbUser = await getDbUser();
    if (!dbUser) return;

    if (!content || !image) return;

    const currentUserWithOutReservedTask = await prisma.user.findUnique({
      where: {
        id: dbUser?.id,
        comments: {
          none: {},
        },
      },
    });

    if (!currentUserWithOutReservedTask) return;
    await prisma.$transaction(async (tx) => {
      await tx.task.create({
        data: {
          content,
          image,
          authorId: dbUser?.id,
        },
      });
      const task = await tx.task.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          authorId: dbUser?.id,
        },
        select: {
          id: true,
          content: true,
          image: true,
        },
      });
      if (dbUser?.role === "driver") {
        await tx.egooNotification.create({
          data: {
            type: "CREATE",
            creatorId: dbUser?.id,
            userId: "cm6n9yci10000ie03mjqn4hqo",
            taskId: task?.id,
          },
        });
      }
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, error: "Failed to create task" };
  }
}

export async function getTasks() {
  try {
    const dbUser = await getDbUser();
    if (!dbUser) return [];

    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
                phone: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return tasks ?? [];
  } catch (error) {
    console.error("Failed to get tasks:", error);
    return [];
  }
}

export async function createTaskComment(content: string, taskId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, error: "User not authenticated" };
    if (!content) return { success: false, error: "Content is required" };

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        authorId: true,
      },
    });

    await prisma.$transaction(async (tx) => {
      const newComment = await tx.egooComment.create({
        data: {
          content,
          authorId: userId,
          taskId,
        },
      });

      const notifications: any[] = [];

      // Fetch distinct previous commenters
      const previousCommenters = await tx.egooComment.findMany({
        where: { taskId, authorId: { not: userId } },
        select: { authorId: true },
        distinct: ["authorId"],
      });

      if (userId === task?.authorId) {
        // Notify all previous commenters
        previousCommenters.forEach(({ authorId }) => {
          notifications.push({
            type: "COMMENT",
            userId: authorId, // ✅ Now correctly passing a string
            creatorId: userId,
            taskId,
            commentId: newComment?.id,
          });
        });
      } else {
        // Notify the task author
        if (task?.authorId) {
          notifications.push({
            type: "COMMENT",
            userId: task.authorId, // ✅ Ensure this is a string
            creatorId: userId,
            taskId,
            commentId: newComment?.id,
          });
        }
      }

      // Create notifications only if there are any
      if (notifications.length > 0) {
        await tx.egooNotification.createMany({ data: notifications });
      }
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create task comment:", error);
    return { success: false, error: "Failed to create task comment" };
  }
}

export async function deleteTask(taskId: string) {
  try {
    const dbUser = await getDbUser();
    if (!dbUser) return;
    if (dbUser?.role !== "admin") return;
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete task:", error);
    return { success: false, error: "Failed to delete task" };
  }
}
