"use server";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getDbUser, getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { parseISO } from "date-fns";
import { addMinutes, differenceInMinutes } from "date-fns";

export async function getHunkelTrips() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return [];

    const hunkelTrips = await prisma.tripindividual.findMany({
      orderBy: {
        date: "asc",
      },
      where: {
        status: "available",
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
            phone: true,
            bio: true,
            location: true,
          },
        },
      },
    });

    return hunkelTrips;
  } catch (error) {
    console.error("Failed to get hunkel trips:", error);
    return [];
  }
}

export async function reserveTrip(tripId: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;
    const dbUser = await getDbUser();
    if (!dbUser) return;

    const tripToReserve = await prisma.tripindividual.findUnique({
      where: { id: tripId },
    });

    if (!tripToReserve) {
      throw new Error("Trip not found.");
    }

    const tripDate = new Date(tripToReserve.date); // Ensure it's a Date object

    const userTripsOnSameDate = await prisma.tripindividual.findMany({
      where: {
        driverId: dbUser.id,
        status: "reserved",
        date: {
          gte: new Date(tripDate.setHours(0, 0, 0, 0)), // Start of the day
          lt: new Date(tripDate.setHours(23, 59, 59, 999)), // End of the day
        },
      },
      orderBy: {
        time: "asc",
      },
    });

    // Convert the reserved trip's time into a full Date object
    const [tripHour, tripMinute] = tripToReserve.time.split(":").map(Number);
    const tripTime = new Date(tripDate);
    tripTime.setHours(tripHour, tripMinute, 0, 0);

    for (const userTrip of userTripsOnSameDate) {
      const userTripDate = new Date(userTrip.date);
      const [userTripHour, userTripMinute] = userTrip.time
        .split(":")
        .map(Number);
      const userTripTime = new Date(userTripDate);
      userTripTime.setHours(userTripHour, userTripMinute, 0, 0);

      const timeDifference = differenceInMinutes(tripTime, userTripTime);
      if (Math.abs(timeDifference) < 40) {
        throw new Error("Cannot book trips with less than a 40-minute gap.");
      }
    }

    // Ensure user can book a max of 3 trips per day
    if (userTripsOnSameDate.length >= 3) {
      throw new Error("You cannot reserve more than 3 trips on the same day.");
    }

    await prisma.tripindividual.update({
      where: {
        id: tripId,
      },
      data: {
        driverId: dbUser.id,
        status: "reserved",
      },
    });

    revalidatePath("/");
    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to reserve trip:", error);
    return {
      success: false,
      error: "Failed to reserve trip",
    };
  }
}

export async function getReservedTrips() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const dbUserId = await getDbUserId();
    if (!user) return [];

    const reservedTrips = await prisma.tripindividual.findMany({
      where: {
        driverId: dbUserId,
        status: "reserved",
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
            phone: true,
            bio: true,
            location: true,
          },
        },
      },
    });

    return reservedTrips;
  } catch (error) {
    console.error("Failed to get reserved trips:", error);
    return [];
  }
}
export async function getAllReservedTrips() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const dbUserId = await getDbUserId();
    if (!user) return [];

    const reservedTrips = await prisma.tripindividual.findMany({
      where: {
        status: "reserved",
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
            phone: true,
            bio: true,
            location: true,
          },
        },
      },
    });

    return reservedTrips;
  } catch (error) {
    console.error("Failed to get reserved trips:", error);
    return [];
  }
}

export async function cancleTrip(tripId: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;
    await prisma.tripindividual.update({
      where: {
        id: tripId,
      },
      data: {
        driverId: null,
        status: "available",
      },
    });
    revalidatePath("/");
    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to cancel trip:", error);
    return {
      success: false,
      error: "Failed to cancel trip",
    };
  }
}

export async function removeDriverFromTrip(tripId: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;
    await prisma.tripindividual.update({
      where: {
        id: tripId,
      },
      data: {
        driverId: null,
        status: "available",
      },
    });
    revalidatePath("/");
    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to remove driver from trip:", error);
    return {
      success: false,
      error: "Failed to remove driver from trip",
    };
  }
}
