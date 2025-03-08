"use client";

import {
  deleteAllPosts,
  deletePostsThatHaveNoComments,
} from "@/actions/post.action";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import RefreshButton from "./RefreshButtuon";

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

  const handelDeleteAllPosts = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deleteAllPosts();
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
        <span>Delete all trips with no comments</span>
        <DeleteAlertDialog
          title="Delete Normal Post that have no comments"
          description="This action cannot be undone."
          isDeleting={isDeleting}
          onDelete={handelDeletePostsWithNoComments}
        />
      </div>
      <div className="flex items-center gap-3">
        <span>Delete all trips</span>
        <DeleteAlertDialog
          title="Delete Normal Post"
          description="This action cannot be undone."
          isDeleting={isDeleting}
          onDelete={handelDeleteAllPosts}
        />
      </div>
      <div>
        <RefreshButton />
      </div>
    </div>
  );
};

export default DeleteNormalTrips;
