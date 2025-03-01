"use client";

import {
  deleteNormalPosts,
  deletePostsThatHaveNoComments,
} from "@/actions/post.action";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { DeleteAlertDialog } from "./DeleteAlertDialog";

const DeleteNormalTrips = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handelDeletePostsWithNoComments = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePostsThatHaveNoComments();
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
        title="Delete Normal Post"
        description="This action cannot be undone."
        isDeleting={isDeleting}
        onDelete={handelDeletePostsWithNoComments}
      />
    </div>
  );
};

export default DeleteNormalTrips;
