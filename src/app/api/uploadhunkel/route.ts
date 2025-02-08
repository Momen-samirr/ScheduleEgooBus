import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TripType } from "@prisma/client";
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
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // Log input data for debugging
    console.log("Received trips data:", JSON.stringify(tripsData, null, 2));

    // Insert new trips into the database
    const createdTrips = await prisma.tripindividual.createMany({
      data: tripsData.map((trip) => ({
        route: trip.route,
        time: trip.time,
        date: new Date(trip.date),
      })),
    });

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
