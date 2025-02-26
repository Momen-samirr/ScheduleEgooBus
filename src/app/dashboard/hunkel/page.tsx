import { getHunkelTrips } from "@/actions/hunkel.action";
import TabelData from "@/components/TabelData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HunkelRoute = async () => {
  const trips = await getHunkelTrips();
  return (
    <>
      <Button variant={"outline"} size={"sm"} className="mb-3" asChild>
        <Link
          href={`/dashboard/reservedTrips`}
          className="flex items-center gap-3"
        >
          <div className="flex items-center">
            <ChevronRight />
            <span>Go to Your Reserved Trips</span>
          </div>
        </Link>
      </Button>
      <Card className="p-6">
        <CardTitle>Hunkel</CardTitle>
        <CardDescription>Hunkel Trips</CardDescription>
        <CardContent>
          <TabelData trips={trips} />
        </CardContent>
      </Card>
    </>
  );
};

export default HunkelRoute;
