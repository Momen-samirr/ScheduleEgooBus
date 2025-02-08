import { getHunkelTrips } from "@/actions/hunkel.action";
import TabelData from "@/components/TabelData";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import React from "react";

const HunkelRoute = async () => {
  const trips = await getHunkelTrips();
  return (
    <Card className="p-6">
      <CardTitle>Hunkel</CardTitle>
      <CardDescription>Hunkel Trips</CardDescription>
      <CardContent>
        <TabelData trips={trips} />
      </CardContent>
    </Card>
  );
};

export default HunkelRoute;
