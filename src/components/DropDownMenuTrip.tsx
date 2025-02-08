"use client";
import React from "react";
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
import { cancleTrip, reserveTrip } from "@/actions/hunkel.action";
import toast from "react-hot-toast";
import { getUserById } from "@/actions/profile.action";
const DropDownMenuTrip = ({ trip }: { trip: any }) => {
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {trip.status === "available" ? (
            <DropdownMenuItem onClick={() => handelReserveTripe(trip.id)}>
              Reserve
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleCancleTrip(trip.id)}>
              Cancle
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownMenuTrip;
