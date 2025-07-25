"use client";

import {
  createComment,
  deleteComment,
  deletePost,
  getPostsDriverView,
} from "@/actions/post.action";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import {
  HeartIcon,
  LogInIcon,
  MessageCircleIcon,
  Moon,
  SendIcon,
  Trash2,
} from "lucide-react";
import { Textarea } from "./ui/textarea";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type Posts = Awaited<ReturnType<typeof getPostsDriverView>>;
type Post = Posts[number];

function PostCard({
  trip,
  dbUserId,
  dbUser,
}: {
  trip: Post;
  dbUserId: string | null;
  dbUser?: any;
}) {
  const { user, getUser } = useKindeBrowserClient();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    trip?.likes?.some(
      (like: { userId: string | null }) => like.userId === dbUserId
    )
  );
  const [optimisticLikes, setOptmisticLikes] = useState(trip?._count.likes);
  const [showComments, setShowComments] = useState(false);

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

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(trip?.id);
      if (result?.success) toast.success("Post deleted successfully");
      else throw new Error(result.error);
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (isDeleting) return;

    try {
      const result = await deleteComment(commentId);
      if (result?.success) toast.success("Comment deleted successfully");
      else throw new Error(result?.error);
    } catch (error) {
      toast.error("Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };

  const haveAcomment = trip?.comments?.some(
    (comment: { authorId: string | null }) => comment?.authorId !== dbUserId
  );
  const haveAcommentme = trip?.comments?.some(
    (comment: { authorId: string | null }) => comment?.authorId === dbUserId
  );
  return (
    <Card className={`${haveAcomment ? "border-2 border-sky-500" : ""}`}>
      <CardHeader>
        <CardTitle className="text-xs text-muted-foreground">
          بعد 10 دقائق من طلبك برجاء التحقق من قائمه الاشعارات لمراجعة حاله طلبك
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/profile/${trip?.author.username}`}>
              <Avatar className="size-8 sm:w-10 sm:h-10">
                <AvatarImage src={trip?.author.image ?? "/avatar.png"} />
              </Avatar>
            </Link>

            {/* POST HEADER & TEXT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                  <Link
                    href={`/profile/${trip?.author.username}`}
                    className="font-semibold truncate"
                  >
                    {trip?.author.name}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {/* <Link href={`/profile/${trip?.author.username}`}>
                      @{trip?.author.username}
                    </Link> */}
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(trip?.createdAt))} ago
                    </span>
                    <span className="flex items-center justify-between gap-3">
                      {trip?.tripMode === "ramdan" ? (
                        <>
                          <Moon className="size-5 text-sky-500" />
                          <span className="text-sky-500">
                            {" "}
                            جداول قوة المكتب
                          </span>
                        </>
                      ) : null}
                    </span>
                  </div>
                </div>
                <div className="ml-5">
                  {trip.tripType === "SOLO" && (
                    <span className="text-sky-500 text-sm">(رحلة فردية)</span>
                  )}
                </div>
                {/* Check if current user is the post author */}
                {dbUserId === trip?.author.id && (
                  <DeleteAlertDialog
                    isDeleting={isDeleting}
                    onDelete={handleDeletePost}
                  />
                )}
              </div>
              <div className="mt-1 text-sky-500 font-bold">
                <p>{trip?.prices}</p>
              </div>
              <p className="mt-2 text-sm text-foreground break-words">
                {trip?.trips}
              </p>{" "}
              {trip?.haiisPrice && trip?.tripType === "SCHEDULED" ? (
                <div className="flex flex-col gap-3 mt-1.5 font-bold">
                  <p className="text-sky-500">سعر الرحلة للهايس/ الصيني</p>
                  <p>{trip?.haiisPrice}</p>
                </div>
              ) : null}
              {trip?.bigcarPrice && (
                <div className="flex flex-col gap-3 mt-1.5 font-bold">
                  <p className="text-sky-500">سعر الرحلة للسيارات الكبيرة</p>
                  <p>{trip?.bigcarPrice}</p>
                </div>
              )}
              {trip?.bigcarPrice && trip?.tripType === "SOLO" ? (
                <div className="flex flex-col gap-3 mt-1.5 font-bold">
                  <p className="text-sky-500">سعر الرحلة </p>
                  <p>{trip?.bigcarPrice}</p>
                </div>
              ) : null}
              <div className="mt-3 text-sm text-red-500">
                <p>{trip?.tableCode}</p>
              </div>
            </div>
          </div>

          {/* LIKE & COMMENT BUTTONS */}
          <div className="flex items-center pt-2 space-x-4">
            {/* {user ? (
            <Button
              variant="ghost"
              size="sm"
              className={`text-muted-foreground gap-2 ${
                hasLiked
                  ? "text-red-500 hover:text-red-600"
                  : "hover:text-red-500"
              }`}
              onClick={handleLike}
            >
              {hasLiked ? (
                <HeartIcon className="size-5 fill-current" />
              ) : (
                <HeartIcon className="size-5" />
              )}
              <span>{optimisticLikes}</span>
            </Button>
          ) : (
            <LoginLink>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground gap-2"
              >
                <HeartIcon className="size-5" />
                <span>{optimisticLikes}</span>
              </Button>
            </LoginLink>
          )} */}

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-blue-500"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`size-5 ${
                  showComments ? "fill-blue-500 text-blue-500" : ""
                }`}
              />
              <span>{trip?.comments.length}</span>
            </Button>
          </div>

          {/* COMMENTS SECTION */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-4">
                {/* DISPLAY COMMENTS */}
                {trip.comments.map(
                  (comment: {
                    id: Key | null | undefined;
                    author: {
                      image: any;
                      phone:
                        | string
                        | number
                        | bigint
                        | boolean
                        | null
                        | undefined;
                      name:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<AwaitedReactNode>
                        | null
                        | undefined;
                      username:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<AwaitedReactNode>
                        | null
                        | undefined;
                    };
                    createdAt: string | number | Date;
                    content:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                  }) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="size-8 flex-shrink-0">
                        <AvatarImage
                          src={comment.author.image ?? "/avatar.png"}
                        />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-medium text-sm">
                            {comment.author.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            @{comment.author.username}
                          </span>
                          <div className="text-sm text-muted-foreground">
                            {comment?.author?.phone}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ·
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(comment?.createdAt))}{" "}
                            ago
                          </span>
                          {user?.email === "egoobus5@gmail.com" && (
                            <div className="flex items-center justify-end gap-3">
                              <DeleteAlertDialog
                                isDeleting={isDeleting}
                                onDelete={() =>
                                  handleDeleteComment(comment?.id as string)
                                }
                                title="Delete comment"
                                description="This action cannot be undone."
                              />
                            </div>
                          )}
                        </div>
                        <p className="text-sm break-words">{comment.content}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex space-x-3">
                <Avatar className="size-8 flex-shrink-0">
                  <AvatarImage src={user?.email || "/avatar.png"} />
                </Avatar>
                {user?.email !== "egoobus5@gmail.com" ? (
                  <div className={`${haveAcomment ? "hidden" : "flex-1"}`}>
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default PostCard;
