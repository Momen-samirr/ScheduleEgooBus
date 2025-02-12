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

    // Check existing trips to prevent duplication
    const existingTrips = await prisma.post.findMany({
      where: {
        tableCode: { in: tripsData.map((trip) => trip.tableCode) },
      },
      select: { tableCode: true },
    });

    const existingTableCodes = new Set(
      existingTrips.map((trip) => trip.tableCode)
    );
    const newTrips = tripsData.filter(
      (trip) => !existingTableCodes.has(trip.tableCode)
    );

    if (newTrips.length === 0) {
      return NextResponse.json(
        { message: "No new trips to add" },
        { status: 200 }
      );
    }

    // Log filtered new trips
    console.log("New trips to be added:", JSON.stringify(newTrips, null, 2));

    // Insert new trips into the database
    const createdTrips = await prisma.post.createMany({
      data: newTrips.map((trip) => ({
        authorId: "cm6n9yci10000ie03mjqn4hqo",
        tripsNum: trip.tripsNum ?? undefined,
        trips: trip.trips ?? trip.tripName ?? "",
        kelometr: trip.kelometr,
        gapmetr: trip.gapmetr !== undefined ? String(trip.gapmetr) : undefined, // Convert number to string
        haiisPrice: trip.haiisPrice ?? undefined,
        bigcarPrice: trip.bigcarPrice ?? undefined,
        tableCode: trip.tableCode,
        prices: trip.prices ?? undefined,
        currentCapacity: trip.current_capacity ?? undefined,
        tripType: trip.tripName ? "SOLO" : "SCHEDULED",
      })),
      skipDuplicates: true,
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
