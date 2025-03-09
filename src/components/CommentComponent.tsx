"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircleIcon, SendIcon } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { createComment, deleteComment } from "@/actions/post.action";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";

const CommentComponent = ({ trip }: { trip: any }) => {
  const { user } = useKindeBrowserClient();
  const [showComments, setShowComments] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const handleDeleteComment = async (commentId: string) => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deleteComment(commentId);
      if (result?.success) toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };
  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment(trip?.id, newComment);
      if (result?.success) {
        toast.success("Comment posted successfully");
        setNewComment("");
      }
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };
  return (
    <div>
      <Button
        variant={"ghost"}
        size={"sm"}
        className="text-muted-foreground gap-3 hover:text-blue-500"
        onClick={() => setShowComments((prev) => !prev)}
      >
        <MessageCircleIcon
          className={`size-5 ${showComments ? "text-blue-500" : ""}`}
        />
        <span>{trip?.comments?.length}</span>
      </Button>
      {showComments && (
        <div className="space-y-5 pt-5 border-t">
          <div className="space-y-3">
            {trip?.comments?.map((comment: any) => (
              <div key={comment?.id} className="flex space-x-3">
                <Avatar className="size-8 flex-shrink-0">
                  <AvatarImage src={comment?.author?.image} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-medium text-sm">
                      {comment?.author?.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      @{comment.author.username}
                    </span>
                    <div className="text-sm text-muted-foreground">
                      {comment?.author?.phone}
                    </div>
                    <span className="text-sm text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment?.createdAt))} ago
                    </span>
                    {user?.email === "egoobus5@gmail.com" && (
                      <div className="flex items-center justify-end gap-3">
                        <DeleteAlertDialog
                          isDeleting={isDeleting}
                          onDelete={() => handleDeleteComment(comment?.id)}
                          title="Delete comment"
                          description="This action cannot be undone."
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm break-words">{comment?.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex space-x-3">
              <Avatar className="size-8 flex-shrink-0">
                <AvatarImage src={user?.email || "/avatar.png"} />
              </Avatar>
              {user?.email !== "egoobus5@gmail.com" ? (
                <div className={`flex-1`}>
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={handleAddComment}
                      className="flex items-center gap-2"
                      disabled={!newComment.trim() || isCommenting}
                    >
                      {isCommenting ? (
                        "Posting..."
                      ) : (
                        <>
                          <SendIcon className="size-4" />
                          Comment
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        onClick={handleAddComment}
                        className="flex items-center gap-2"
                        disabled={!newComment.trim() || isCommenting}
                      >
                        {isCommenting ? (
                          "Posting..."
                        ) : (
                          <>
                            <SendIcon className="size-4" />
                            Comment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
