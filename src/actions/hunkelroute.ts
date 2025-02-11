import prisma from "@/lib/prisma";

export async function getRoutesWithTrips() {
  try {
    const routes = await prisma.route.findMany({
      select: {
        id: true,
        name: true, // ✅ Ensuring route name is included
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
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
