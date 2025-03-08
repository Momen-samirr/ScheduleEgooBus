"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  cancleTrip,
  makeTripAsDone,
  reserveTrip,
} from "@/actions/hunkel.action";
import toast from "react-hot-toast";
import { getUserById } from "@/actions/profile.action";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
const DropDownMenuTrip = ({ trip }: { trip: any }) => {
  const [isPending, setIsPending] = useState(false);
  const handelReserveTripe = async (tripId: string) => {
    try {
      const result = await reserveTrip(tripId);
      if (result?.success) {
        toast.success("Trip reserved successfully");
      }
    } catch (error) {
      toast.error("Failed to reserve trip");
      console.error("Failed to reserve trip:", error);
    }
  };
  const handleCancleTrip = async (tripId: string) => {
    try {
      const result = await cancleTrip(tripId);
      if (result?.success) {
        toast.success("Trip cancled successfully");
      }
    } catch (error) {
      toast.error("Failed to cancle trip");
      console.error("Failed to reserve trip:", error);
    }
  };

  const handelMakeTripAsDone = async (tripId: string) => {
    setIsPending(true);
    try {
      const result = await makeTripAsDone(tripId);
      if (result?.success) {
        toast.success("Trip marked as done successfully");
      }
    } catch (error) {
      toast.error("Failed to mark trip as done");
      console.error("Failed to mark trip as done:", error);
    } finally {
      setIsPending(false);
    }
  };

  const { user } = useKindeBrowserClient();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`h-8 w-8 p-0 ${
              trip?.reservedTripStatus === "done" ? "hidden" : ""
            }`}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user?.email !== "score.uber@gmail.com" ? (
            <>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {trip.status === "available" ? (
                <>
                  <DropdownMenuItem onClick={() => handelReserveTripe(trip.id)}>
                    Reserve
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => handleCancleTrip(trip.id)}>
                    Cancle
                  </DropdownMenuItem>
                  {trip?.reservedTripStatus === "notDone" && (
                    <DropdownMenuItem
                      onClick={() => handelMakeTripAsDone(trip?.id)}
                    >
                      Mark as done
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <DropdownMenuLabel>No permission for actions😉</DropdownMenuLabel>
            </>
          )}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownMenuTrip;
