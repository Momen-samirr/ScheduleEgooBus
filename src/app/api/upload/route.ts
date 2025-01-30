import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const user: string | any = await currentUser();
    const body = await req.json();
    const { tripsData } = body;

    if (!Array.isArray(tripsData)) {
      return NextResponse.json(
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }

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

    const createdTrips = await prisma.post.createMany({
      data: newTrips.map((trip) => ({
        authorId: "cm6jt8cjm00a0g5fsdemea62h",
        tableCode: trip.tableCode,
        tripsNum: trip.tripsNum,
        trips: trip.trips,
        haiisPrice: trip.haiisPrice,
        bigcarPrice: trip.bigcarPrice,
        kelometr: trip.kelometr,
        gapmetr: trip.gapmetr,
        prices: trip.prices,
        currentCapacity: trip.current_capacity,
      })),
    });

    return NextResponse.json(
      { message: "New trips uploaded successfully", createdTrips },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading trips:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
