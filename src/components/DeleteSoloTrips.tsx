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
  return (
    <div>
      <DeleteAlertDialog
        title="Delete Post"
        description="This action cannot be undone."
        isDeleting={isDeleting}
        onDelete={handelDeleteSoloTripsWithNoComments}
      />
    </div>
  );
};

export default DeleteSoloTrips;
