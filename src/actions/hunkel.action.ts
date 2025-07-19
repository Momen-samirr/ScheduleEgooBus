"use server";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getDbUser, getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { isAfter, parseISO, setHours, setMinutes, setSeconds } from "date-fns";
import { addMinutes, differenceInMinutes } from "date-fns";
import { isBefore } from "date-fns";

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
      if (
        dbUser?.id === "cm6ngc9f90004l103ll0dc5kt" ||
        dbUser?.id === "cm6qhhonz0000lc03v3d3uhxy"
      ) {
        if (Math.abs(timeDifference) < 30) {
          return {
            success: false,
            error:
              "You cannot reserve two trips within 30 minutes of each other.",
          };
        }
      } else {
        if (Math.abs(timeDifference) < 40) {
          return {
            success: false,
            error:
              "You cannot reserve two trips within 40 minutes of each other.",
          };
        }
      }
    }

    if (userTripsOnSameDate.length >= 4) {
      throw new Error("You cannot reserve more than 3 trips on the same day.");
    }

    await prisma.tripindividual.update({
      where: {
        id: tripId,
      },
      data: {
        driverId: dbUser?.id,
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
        reservedTripStatus: "notDone",
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

export async function getAllReservedDoneTrips() {
  try {
    const dbUser = await getDbUser();
    if (!dbUser) return [];
    const reservedDoneTrips = await prisma.tripindividual.findMany({
      where: {
        status: "reserved",
        reservedTripStatus: "done",
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

    return reservedDoneTrips;
  } catch (error) {
    console.error("Failed to get reserved done trips:", error);
    return [];
  }
}

export async function cancleTrip(tripId: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;
    const dbUser = await getDbUser();
    if (!dbUser) return;
    await prisma.tripindividual.update({
      where: {
        id: tripId,
        driverId: dbUser?.id,
        status: "reserved",
        reservedTripStatus: "notDone",
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

export async function makeTripAsDone(tripId: string) {
  try {
    const dbUser = await getDbUser();
    if (!dbUser) return;
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;

    const trip = await prisma.tripindividual.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return { success: false, error: "Trip not found" };
    }

    const now = new Date();
    const tripDate = new Date(trip.date); // Convert Prisma DateTime to JS Date

    // Ensure the trip date is today or earlier
    if (isBefore(now, tripDate)) {
      return {
        success: false,
        error: "Trip cannot be marked as done before its scheduled date",
      };
    }

    // Define the allowed time range (8 PM - 10 PM)
    const startTime = setSeconds(setMinutes(setHours(now, 8), 0), 0);
    const endTime = setSeconds(setMinutes(setHours(now, 22), 0), 0);

    if (isBefore(now, startTime) || isAfter(now, endTime)) {
      return {
        success: false,
        error: "Trip can only be marked as done between 8 PM and 10 PM",
      };
    }

    await prisma.tripindividual.update({
      where: {
        id: tripId,
        driverId: dbUser?.id,
        status: "reserved",
      },
      data: {
        reservedTripStatus: "done",
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark trip as done:", error);
    return { success: false, error: "Failed to mark trip as done" };
  }
}
