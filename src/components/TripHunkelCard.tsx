"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Separator } from "./ui/separator";

const TripHunkelCard = ({ routeInfo }: any) => {
  console.log("routeInfo:", routeInfo);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xs text-muted-foreground">
            بعد 10 دقائق من طلبك برجاء التحقق من قائمه الاشعارات لمراجعة حاله
            طلبك
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex space-x-3 sm:space-x-4">
              {/* POST HEADER & TEXT CONTENT */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between"></div>
                <div className="mt-1 text-sky-500 font-bold">
                  {routeInfo?.trips?.map((trip: any) => (
                    <>
                      <div
                        key={trip.id}
                        className="flex items-center justify-between gap-3 p-6"
                      >
                        <p>
                          {trip?.outbound?.startTime} -{" "}
                          {trip?.outbound?.endTime}
                        </p>
                        <span>{trip?.date.toDateString()}</span>
                      </div>
                      <Separator />
                    </>
                  ))}
                </div>
                <p className="mt-2 text-sm text-foreground break-words">
                  {routeInfo?.name}
                </p>
                <div className="mt-3 text-sm text-red-500">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TripHunkelCard;
