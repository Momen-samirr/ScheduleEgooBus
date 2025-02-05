import TabelData from "@/components/TabelData";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import React from "react";

const HunkelRoute = () => {
  return (
    <Card>
      <CardTitle>Hunkel</CardTitle>
      <CardDescription>Hunkel Trips</CardDescription>
      <CardContent>
        <TabelData />
      </CardContent>
    </Card>
  );
};

export default HunkelRoute;
