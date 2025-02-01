import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId || !user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      return new Response(JSON.stringify(existingUser), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.given_name || ""} ${user.family_name || ""}`,
        username: user.email?.split("@")[0] || "",
        email: user.email ?? "",
        image: user.picture ?? "",
      },
    });

    return new Response(JSON.stringify(dbUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in syncUser", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
