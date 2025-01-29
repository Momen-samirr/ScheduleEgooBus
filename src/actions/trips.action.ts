import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Handle POST requests to insert trip data from JSON
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the incoming JSON
    const { trips } = body; // Extract trip data from the JSON

    if (!Array.isArray(trips)) {
      return NextResponse.json(
        { error: "Invalid input: trips should be an array" },
        { status: 400 }
      );
    }

    // Insert trips into the database
    const createdTrips = await prisma.trip.createMany({
      data: trips.map((trip: any) => ({
        tableCode: trip.tableCode,
        tripsNum: trip.tripsNum,
        trips: trip.trips,
        haiisPrice: trip.haiisPrice,
        bigcarPrice: trip.bigcarPrice,
        kelometr: trip.kelometr,
        gapmetr: trip.gapmetr,
        prices: trip.prices,
        currentCapacity: trip.currentCapacity,
      })),
      skipDuplicates: true, // Avoid inserting duplicate entries
    });

    return NextResponse.json({
      message: "Trips successfully added",
      createdTrips,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
