"use client";

import React, { useState } from "react";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import {
  deleteAllSoloTrips,
  deleteSoloPostsThatHaveNoComments,
} from "@/actions/post.action";
import toast from "react-hot-toast";

const DeleteSoloTrips = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handelDeleteSoloTripsWithNoComments = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deleteSoloPostsThatHaveNoComments();
      if (result?.success)
        toast.success("All trips with no comments deleted successfully");
    } catch (error) {
      toast.error("Failed to delete all trips");
    } finally {
      setIsDeleting(false);
    }
  };

  const handelDeleteAllSoloTrips = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const result = await deleteAllSoloTrips();
      if (result?.success) toast.success("All posts deleted successfully");
    } catch (error) {
      toast.error("Failed to delete all posts");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span>Delete all solo trips tat have no comments</span>
        <DeleteAlertDialog
          title="Delete All solo trips with no comments"
          description="This action cannot be undone."
          isDeleting={isDeleting}
          onDelete={handelDeleteSoloTripsWithNoComments}
        />
      </div>
      <div className="flex items-center gap-3">
        <span>Delete all solo trips</span>
        <DeleteAlertDialog
          title="Delete all Solo Trips"
          description="This action cannot be undone."
          isDeleting={isDeleting}
          onDelete={handelDeleteAllSoloTrips}
        />
      </div>
    </div>
  );
};

export default DeleteSoloTrips;
