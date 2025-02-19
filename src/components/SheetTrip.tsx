"use client";

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
import { Check, DatabaseBackupIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useTransition } from "react";
import { cancleReserveRoute, markTripAsCompleted } from "@/actions/hunkelroute";
import toast from "react-hot-toast";

interface Props {
  routeInfo: any;
  onClick?: () => void;
}

const SheetTrip = ({ routeInfo, onClick }: Props) => {
  const [isPending, startTransition] = useTransition();
  const handelCancleReserveRoute = async (routeId: string) => {
    startTransition(async () => {
      const result = await cancleReserveRoute(routeId);
      if (result?.success) {
        toast.success("Route cancled successfully");
      } else {
        toast.error("Failed to cancle route");
      }
    });
  };

  const handelMarkTripAsCompleted = async (tripId: string) => {
    startTransition(async () => {
      const result = await markTripAsCompleted(tripId);
      if (result?.success) {
        toast.success("Trip marked as completed successfully");
      } else {
        toast.error("Failed to mark trip as completed");
      }
    });
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>Details</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{routeInfo?.name}</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="mt-3 flex flex-col gap-3">
              {routeInfo?.trips?.map((trip: any) => (
                <>
                  <div
                    key={trip.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>{trip.date?.toLocaleDateString()}</div>
                    {routeInfo?.status === "reserved" && (
                      <div>
                        <Button
                          variant={"secondary"}
                          size={"sm"}
                          className={`${
                            trip?.status === "done" &&
                            "cursor-not-allowed bg-green-700"
                          }`}
                          onClick={() => handelMarkTripAsCompleted(trip?.id)}
                          disabled={isPending}
                        >
                          <Check className="size-5" />
                          <span>
                            {isPending ? (
                              <Loader2 className="size-5 animate-spin" />
                            ) : (
                              "Mark as completed"
                            )}
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex items-center justify-between gap-3 ${
                      trip?.status === "done" && "cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sky-500">حضور:</span>
                      {trip?.outbound?.startTime} - {trip?.outbound?.endTime}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sky-500">انصراف:</span>
                      {trip?.returnTrip?.startTime} -{" "}
                      {trip?.returnTrip?.endTime}
                    </div>
                  </div>
                  <Separator />
                </>
              ))}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center justify-between space-x-3 gap-3">
                  {routeInfo?.status === "available" && (
                    <Button variant={"ghost"} size={"sm"} onClick={onClick}>
                      <DatabaseBackupIcon />
                      <span>Reserve</span>
                    </Button>
                  )}
                  {routeInfo?.status === "reserved" ? (
                    <>
                      <Button
                        variant={"destructive"}
                        size={"sm"}
                        className="flex items-center gap-3"
                        onClick={() => handelCancleReserveRoute(routeInfo?.id)}
                      >
                        {isPending ? (
                          <Loader2 className="size-5 animate-spin" />
                        ) : (
                          "Cancle"
                        )}
                      </Button>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Button variant={"destructive"}>Close</Button>
                    </SheetClose>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SheetTrip;
