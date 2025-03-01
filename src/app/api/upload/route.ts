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

    // Insert new trips into the database
    const createdTrips = await prisma.post.createMany({
      data: newTrips.map((trip) => ({
        authorId: "cm6n9yci10000ie03mjqn4hqo",
        tripsNum: trip.tripsNum ?? null, // Use null instead of undefined
        trips: trip.trips ?? trip.tripName ?? "", // Ensure a string is always set
        kelometr: trip.kelometr ?? null,
        gapmetr: trip.gapmetr !== undefined ? String(trip.gapmetr) : null, // Convert to string if present
        haiisPrice: trip.haiisPrice
          ? String(trip.haiisPrice)
          : trip.haiss
          ? String(trip.haiss)
          : null, // Ensure string
        bigcarPrice:
          trip.bigcarPrice !== undefined ? String(trip.bigcarPrice) : null, // Convert to string if needed
        tableCode: trip.tableCode ?? "UNKNOWN", // Ensure tableCode is always set
        tripMode: trip.haiss ? "normal" : "ramdan",
        prices: trip.prices !== undefined ? String(trip.prices) : null, // Convert to string if needed
        currentCapacity: trip.current_capacity ?? null,
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
