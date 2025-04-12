import { getHunkelTrips } from "@/actions/hunkel.action";
import { getDbUser } from "@/actions/user.action";
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
import { redirect } from "next/navigation";
import React from "react";

const HunkelRoute = async () => {
  const trips = await getHunkelTrips();
  const dbUser = await getDbUser();
  if (dbUser?.role === "user") return redirect("/");
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
