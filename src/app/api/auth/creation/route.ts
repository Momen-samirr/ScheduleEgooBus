import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // const { userId } = await auth();
    // const user = await currentUser();
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
};
