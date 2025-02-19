"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { DatabaseBackupIcon } from "lucide-react";
import SheetTrip from "./SheetTrip";
import { reserveRoute } from "@/actions/hunkelroute"; // Import the server action
import toast from "react-hot-toast";
import DialogComponet from "./DialogComponet";

const TripHunkelCard = ({ routeInfo }: any, dbUser?: any) => {
  console.log("routeInfo:", routeInfo);

  const [isPending, startTransition] = useTransition();

  const handleReserveRoute = (routeId: string) => {
    startTransition(async () => {
      const result = await reserveRoute(routeId);
      if (result?.success) {
        toast.success("Route reserved successfully");
      } else {
        toast.error("Failed to reserve route");
      }
    });
  };

  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <div className="flex-1 min-w-0">
              <p className="mt-2 text-sm text-foreground break-words mb-1">
                {routeInfo?.name}
              </p>
              <div className="flex items-center justify-between pt-2 space-x-5">
                {routeInfo?.status === "reserved" ? (
                  <>
                    <DialogComponet routeInfo={routeInfo} />
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReserveRoute(routeInfo?.id)}
                    disabled={isPending}
                  >
                    <DatabaseBackupIcon />
                    <span>{isPending ? "Reserving..." : "Reserve Route"}</span>
                  </Button>
                )}
                <SheetTrip
                  routeInfo={routeInfo}
                  dbUser={dbUser}
                  onClick={() => handleReserveRoute(routeInfo?.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripHunkelCard;
