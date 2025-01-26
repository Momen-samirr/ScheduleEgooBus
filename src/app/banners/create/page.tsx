"use client";

import { createBanner } from "@/actions/banner.action";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Loader2, SendIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateBannerRoute = () => {
  const [title, setTitle] = useState("");
  const [imageString, setImageString] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handelCreateBanner = async () => {
    if (!title.trim()) return;
    setIsSaving(true);

    try {
      const result = await createBanner(title, imageString);
      if (result?.success) {
        setTitle("");
        setImageString("");
        setShowImageUpload(false);
        toast.success("Banner created successfully");
      }
    } catch (error) {
      toast.error("Failed to create banner");
      console.error("Failed to create banner:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="pt-6">
      <CardContent pt-6>
        <div className="space-y-5 mb-3">
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSaving}
          />
        </div>
        {(showImageUpload || imageString) && (
          <div className="border rounded-lg p-4">
            <ImageUpload
              endpoint="postImage"
              value={imageString}
              onChange={(url) => {
                setImageString(url);
                if (!url) setShowImageUpload(false);
              }}
            />
          </div>
        )}

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={"ghost"}
              size={"sm"}
              className="text-muted-foreground hover:text-primary"
              onClick={() => setShowImageUpload(!showImageUpload)}
              disabled={isSaving}
            >
              <ImageIcon className="size-5 mr-3" />
              Image
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="flex items-center"
              onClick={handelCreateBanner}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-5 mr-3 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <SendIcon className="size-5 mr-3" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateBannerRoute;
