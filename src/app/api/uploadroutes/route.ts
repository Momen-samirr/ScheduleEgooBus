import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const body = await req.json();
    const { tripsData } = body;

    if (!Array.isArray(tripsData)) {
      return NextResponse.json(
        { message: "Invalid JSON format. Expected an array of routes." },
        { status: 400 }
      );
    }

    console.log("Received trips data:", JSON.stringify(tripsData, null, 2));

    const createdTrips = [];

    for (const trip of tripsData) {
      const { route, trips } = trip;

      // Always create a new route (since name is not unique)
      const newRoute = await prisma.route.create({
        data: { name: route },
      });

      for (const tripDetail of trips) {
        const { date, outbound, return: returnTrip } = tripDetail;

        const createdTrip = await prisma.hunkelTrip.create({
          data: {
            date: new Date(date),
            route: { connect: { id: newRoute.id } }, // Link to newly created route
          },
        });

        // Create outbound trip
        const createdOutbound = await prisma.outbound.create({
          data: {
            trip: { connect: { id: createdTrip.id } },
            startTime: outbound.start,
            endTime: outbound.end,
          },
        });

        // Create return trip
        const createdReturnTrip = await prisma.returnTrip.create({
          data: {
            trip: { connect: { id: createdTrip.id } },
            startTime: returnTrip.start,
            endTime: returnTrip.end,
          },
        });

        createdTrips.push({
          route: newRoute,
          hunkelTrip: createdTrip,
          outbound: createdOutbound,
          returnTrip: createdReturnTrip,
        });
      }
    }

    return NextResponse.json(
      { message: "New trips uploaded successfully", createdTrips },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading trips:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
