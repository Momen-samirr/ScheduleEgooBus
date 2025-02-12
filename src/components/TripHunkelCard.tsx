"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { DatabaseBackupIcon, MoveLeft, MoveRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SheetTrip from "./SheetTrip";

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
                <p className="mt-2 text-sm text-foreground break-words mb-1">
                  {routeInfo?.name}
                </p>
                <div className="flex items-center justify-between pt-2 space-x-5">
                  <Button variant={"ghost"} size={"sm"}>
                    <DatabaseBackupIcon />
                    <span>Reserve</span>
                  </Button>
                  <div>
                    <SheetTrip routeInfo={routeInfo} />
                  </div>
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
