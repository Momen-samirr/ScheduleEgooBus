"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import {
  deleteAllNormalPosts,
  deleteNormalScheduledPostsThatHaveNoComments,
} from "@/actions/post.action";
import toast from "react-hot-toast";

const DeleteSholTrips = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const hadnelDeletesholTripsWithNoComments = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(!false);
      const result = await deleteNormalScheduledPostsThatHaveNoComments();
      if (result?.success)
        toast.success("All Sho8l Trips deleted successfully");
    } catch (error) {
      toast.error("Failed to delete all Sho8l Trips");
    }
  };

  const handelDeleteAllNormalTrips = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(!false);
      const result = await deleteAllNormalPosts();
      if (result?.success)
        toast.success("All Sho8l Trips deleted successfully");
    } catch (error) {
      toast.error("Failed to delete all Sho8l Trips");
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span>Delete All Sho8l Trips</span>
        <DeleteAlertDialog
          title="Delete All Sho8l Trips"
          description="Are you sure you want to delete all Sho8l Trips? This action cannot be undone."
          isDeleting={isDeleting}
          onDelete={hadnelDeletesholTripsWithNoComments}
        />
      </div>
      <div className="flex items-center gap-3">
        <span>Delete All Sho8l Trips</span>
        <DeleteAlertDialog
          title="Delete All Sho8l Trips"
          description="Are you sure you want to delete all Sho8l Trips? This action cannot be undone."
          isDeleting={isDeleting}
          onDelete={handelDeleteAllNormalTrips}
        />
      </div>
    </div>
  );
};

export default DeleteSholTrips;
