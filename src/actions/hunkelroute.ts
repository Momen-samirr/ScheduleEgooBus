"use server";

import prisma from "@/lib/prisma";
import { getDbUser } from "./user.action";
import { revalidatePath } from "next/cache";

export async function getRoutesWithTrips() {
  try {
    const routes = await prisma.route.findMany({
      where: {
        status: "available",
      },
      select: {
        id: true,
        name: true,
        status: true,
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        trips: {
          select: {
            id: true,
            date: true,
            outbound: {
              select: {
                id: true,
                startTime: true,
                endTime: true,
              },
            },
            returnTrip: {
              select: {
                id: true,
                startTime: true,
                endTime: true,
              },
            },
          },
        },
      },
    });
    return routes;
  } catch (error) {
    console.error("Error in getRoutesWithTrips:", error);
    throw new Error("Failed to fetch routes with trips");
  }
}

export async function getMyRouteWithTrips() {
  try {
    const dbUser = await getDbUser();

    if (!dbUser) return null;

    const myRoute = await prisma.route.findUnique({
      where: {
        driverId: dbUser?.id,
        status: "reserved",
      },
      select: {
        id: true,
        name: true,
        status: true,
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        trips: {
          select: {
            id: true,
            date: true,
            outbound: {
              select: {
                id: true,
                startTime: true,
                endTime: true,
              },
            },
            returnTrip: {
              select: {
                id: true,
                startTime: true,
                endTime: true,
              },
            },
          },
        },
      },
    });

    if (!myRoute) return null;

    return myRoute;
  } catch (error) {
    console.error("Error in getMyRouteWithTrips:", error);
    throw new Error("Failed to fetch my route with trips");
  }
}

export async function getReservedRoutes() {
  try {
    const routes = await prisma.route.findMany({
      where: {
        status: "reserved",
      },
      select: {
        id: true,
        name: true,
        status: true,
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        trips: {
          select: {
            id: true,
            date: true,
            outbound: {
              select: {
                id: true,
                startTime: true,
                endTime: true,
              },
            },
            returnTrip: {
              select: {
                id: true,
                startTime: true,
                endTime: true,
              },
            },
          },
        },
      },
    });

    return routes;
  } catch (error) {}
}
export async function reserveRoute(routeId: string) {
  try {
    const dbUser = await getDbUser();
    if (!dbUser) return;

    await prisma.route.update({
      where: {
        id: routeId,
        status: "available",
      },
      data: {
        driverId: dbUser?.id,
        status: "reserved",
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error in reserveRoute:", error);
    return { success: false, error: "Failed to reserve route" };
  }
}

export async function cancleReserveRoute(routeId: string) {
  try {
    const dbUser = await getDbUser();
    if (!dbUser) return;

    await prisma.route.update({
      where: {
        id: routeId,
        status: "reserved",
      },
      data: {
        driverId: null,
        status: "available",
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error in cancleReserveRoute:", error);
    return { success: false, error: "Failed to cancle reserve route" };
  }
}

export async function markTripAsCompleted(tripId: string) {
  try {
    const dbUser = await getDbUser();
    if (!dbUser) return;

    const trip = await prisma.hunkelTrip.findUnique({
      where: {
        id: tripId,
        status: "done",
      },
    });

    if (trip)
      return { success: false, error: "Trip already marked as completed" };

    await prisma.hunkelTrip.update({
      where: {
        id: tripId,
        status: "notdone",
      },
      data: {
        status: "done",
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error in markTripAsCompleted:", error);
    return { success: false, error: "Failed to mark trip as completed" };
  }
}
