"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { createTask } from "@/actions/task.action";

function CreatePost() {
  const { user } = useKindeBrowserClient();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  // const handleSubmit = async () => {
  //   if (!content.trim() && !imageUrl) return;

  //   setIsPosting(true);
  //   try {
  //     const result = await createPost(content, imageUrl);
  //     if (result?.success) {
  //       // reset the form
  //       setContent("");
  //       setImageUrl("");
  //       setShowImageUpload(false);

  //       toast.success("Post created successfully");
  //     }
  //   } catch (error) {
  //     console.error("Failed to create post:", error);
  //     toast.error("Failed to create post");
  //   } finally {
  //     setIsPosting(false);
  //   }
  // };

  const handelSubmit = async () => {
    if (!content.trim() && imageUrl) return;
    setIsPosting(true);
    try {
      const result = await createTask(content, imageUrl);
      if (result?.success) {
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);
        toast.success("Task created successfully");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-5">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={`${user?.picture}`} />
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-5 mr-3" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handelSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-5 mr-3 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="size-5 mr-3" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default CreatePost;
