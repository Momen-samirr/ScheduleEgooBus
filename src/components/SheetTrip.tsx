import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { DatabaseBackupIcon } from "lucide-react";
import { Button } from "./ui/button";

const SheetTrip = ({ routeInfo }: { routeInfo: any }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger>Details</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
          <div className="mt-3 flex flex-col gap-3">
            {routeInfo?.trips?.map((trip: any) => (
              <>
                <div key={trip.id}>
                  <div>{trip.date?.toLocaleDateString()}</div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sky-500">حضور:</span>
                    {trip?.outbound?.startTime} - {trip?.outbound?.endTime}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sky-500">انصراف:</span>
                    {trip?.returnTrip?.startTime} - {trip?.returnTrip?.endTime}
                  </div>
                </div>
                <Separator />
              </>
            ))}
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center justify-between space-x-3 gap-3">
                <Button variant={"ghost"} size={"sm"}>
                  <DatabaseBackupIcon />
                  <span>Reserve</span>
                </Button>
                <SheetClose asChild>
                  <Button variant={"destructive"}>Cancel</Button>
                </SheetClose>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SheetTrip;
