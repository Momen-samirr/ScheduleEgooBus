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
import {
  cancleTrip,
  removeDriverFromTrip,
  reserveTrip,
} from "@/actions/hunkel.action";
import toast from "react-hot-toast";
import { getUserById } from "@/actions/profile.action";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
const DropDownMenuEmployee = ({ trip }: { trip: any }) => {
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
      const result = await removeDriverFromTrip(tripId);
      if (result?.success) {
        toast.success("Trip cancled successfully");
      }
    } catch (error) {
      toast.error("Failed to cancle trip");
      console.error("Failed to reserve trip:", error);
    }
  };

  const { user } = useKindeBrowserClient();

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
          {user?.email === "egoobus5@gmail.com" ? (
            <>
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

export default DropDownMenuEmployee;
