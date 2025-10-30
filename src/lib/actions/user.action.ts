"use server";

import prisma from "../prisma";

// ...existing code...
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // return a string (completely plain) so Server Actions won't reject prototypes
    return JSON.stringify(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
// ...existing code...
