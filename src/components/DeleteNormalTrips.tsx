"use client";

import { deleteNormalPosts } from "@/actions/post.action";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { DeleteAlertDialog } from "./DeleteAlertDialog";

const DeleteNormalTrips = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handelDeleteNormalPosts = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deleteNormalPosts();
      if (result?.success) toast.success("All trips deleted successfully");
    } catch (error) {
      toast.error("Failed to delete all trips");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div>
      <DeleteAlertDialog
        title="Delete Normal Post"
        description="This action cannot be undone."
        isDeleting={isDeleting}
        onDelete={handelDeleteNormalPosts}
      />
    </div>
  );
};

export default DeleteNormalTrips;
