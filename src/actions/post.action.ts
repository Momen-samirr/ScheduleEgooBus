"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

// export async function createPost(content: string, image: string) {
//   try {
//     const userId = await getDbUserId();

//     if (!userId) return;

//     const post = await prisma.post.create({
//       data: {
//         content,
//         image,
//         authorId: userId,
//       },
//     });

//     revalidatePath("/"); // purge the cache for the home page
//     return { success: true, post };
//   } catch (error) {
//     console.error("Failed to create post:", error);
//     return { success: false, error: "Failed to create post" };
//   }
// }

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        tripType: "SCHEDULED",
        tripMode: "ramdan",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
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
                username: true,
                image: true,
                name: true,
                phone: true,
              },
            },
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.log("Error in getPosts", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getRamdanPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        tripType: "SCHEDULED",
        tripMode: "normal",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
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
                username: true,
                image: true,
                name: true,
                phone: true,
              },
            },
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.log("Error in getPosts", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getSoloPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        tripType: "SOLO",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.log("Error in getPosts", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function toggleLike(postId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    // check if like exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found");

    if (existingLike) {
      // unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      // like and create notification (only if liking someone else's post)
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            postId,
          },
        }),
        ...(post.authorId !== userId
          ? [
              prisma.notification.create({
                data: {
                  type: "LIKE",
                  userId: post.authorId, // recipient (post author)
                  creatorId: userId, // person who liked
                  postId,
                },
              }),
            ]
          : []),
      ]);
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

export async function createComment(postId: string, content: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, error: "User not authenticated" };
    if (!content) return { success: false, error: "Content is required" };

    const existingComment = await prisma.comment.findFirst({
      where: {
        authorId: userId,
        post: {
          tripMode: "normal",
        },
      },
      select: { id: true },
    });

    if (existingComment) {
      return { success: false, error: "You can only comment on one post." };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) return { success: false, error: "Post not found" };

    await prisma.$transaction(async (tx) => {
      const newComment = await tx.comment.create({
        data: { content, authorId: userId, postId },
      });

      const notifications: any[] = [];

      // Find previous commenters
      const previousCommenters = await tx.comment.findMany({
        where: { postId, authorId: { not: userId } },
        select: { authorId: true },
        distinct: ["authorId"],
      });

      if (userId === post.authorId) {
        previousCommenters.forEach(({ authorId }) => {
          notifications.push({
            type: "COMMENT",
            userId: authorId,
            creatorId: userId,
            postId,
            commentId: newComment.id,
          });
        });
      } else {
        notifications.push({
          type: "COMMENT",
          userId: post.authorId,
          creatorId: userId,
          postId,
          commentId: newComment.id,
        });

        previousCommenters.forEach(({ authorId }) => {
          if (authorId !== post.authorId) {
            notifications.push({
              type: "COMMENT",
              userId: authorId,
              creatorId: userId,
              postId,
              commentId: newComment.id,
            });
          }
        });
      }

      if (notifications.length > 0) {
        await tx.notification.createMany({ data: notifications });
      }
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, error: error };
  }
}

export async function deletePost(postId: string) {
  try {
    const userId = await getDbUserId();

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found");
    if (post.authorId !== userId)
      throw new Error("Unauthorized - no delete permission");

    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/"); // purge the cache
    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}
