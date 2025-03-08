"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export async function syncUser() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.given_name || ""} ${user.family_name || ""}`,
        username: user.email?.split("@")[0] || "",
        email: user.email ?? "",
        image: user.picture ?? "",
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });
}

export async function getDbUserId() {
  // const { userId: clerkId } = await auth();

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const clerkId = user?.id;
  if (!clerkId) return null;

  const authUser = await getUserByClerkId(clerkId);

  if (!user) return null;

  return authUser?.id;
}

export async function getDbUser() {
  const userId = await getDbUserId();

  if (!userId) return null;

  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      comments: {
        select: {
          id: true,
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
  });

  return dbUser;
}

export async function getRandomUsers() {
  try {
    const userId = await getDbUserId();

    if (!userId) return [];

    // get 3 random users exclude ourselves & users that we already follow
    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [{ NOT: { id: userId } }],
        NOT: {
          comments: {
            none: {},
          },
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        phone: true,
        _count: {
          select: {
            followers: true,
            comments: true,
          },
        },
      },
    });

    return randomUsers;
  } catch (error) {
    console.log("Error fetching random users", error);
    return [];
  }
}
export async function getUsersWithNoComments() {
  try {
    const userId = await getDbUserId();

    if (!userId) return [];

    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [{ NOT: { id: userId } }],
        comments: {
          none: {},
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        phone: true,
        _count: {
          select: {
            followers: true,
            comments: true,
          },
        },
      },
    });

    return randomUsers;
  } catch (error) {
    console.log("Error fetching random users", error);
    return [];
  }
}

export async function getUsers() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) return [];

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: user.id,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        phone: true,
        role: true,
        comments: {
          select: {
            id: true,
            content: true,
            post: {
              select: {
                id: true,
                trips: true,
                tableCode: true,
              },
            },
            author: {
              select: {
                id: true,
                name: true,
                phone: true,
                image: true,
              },
            },
          },
          take: 5, // Limit the number of comments if necessary
        },
        _count: {
          select: {
            posts: true,
            trips: true,
          },
        },
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users"); // Throwing an error can be useful for debugging
  }
}

export async function getHunkelDrivers() {
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          trips: {
            none: {},
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        phone: true,
        role: true,
        _count: {
          select: {
            trips: true,
          },
        },
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users"); // Throwing an error can be useful for debugging
  }
}

export async function toggleFollow(targetUserId: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    if (userId === targetUserId) throw new Error("You cannot follow yourself");

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      // unfollow
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId,
          },
        },
      });
    } else {
      // follow
      await prisma.$transaction([
        prisma.follows.create({
          data: {
            followerId: userId,
            followingId: targetUserId,
          },
        }),

        prisma.notification.create({
          data: {
            type: "FOLLOW",
            userId: targetUserId, // user being followed
            creatorId: userId, // user following
          },
        }),
      ]);
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Error in toggleFollow", error);
    return { success: false, error: "Error toggling follow" };
  }
}
