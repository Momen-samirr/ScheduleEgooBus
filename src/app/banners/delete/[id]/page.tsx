"use client";

import { deleteBanner } from "@/actions/banner.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const page = ({ params }: { params: { id: string } }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const hadnelDeleteBanner = async (bannerId: string) => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deleteBanner(bannerId);
      if (result?.success) {
        toast.success("Banner deleted successfully");
        window.location.href = "/banners";
      }
    } catch (error) {
      toast.error("Failed to delete banner");
      console.error("Failed to delete banner:", error);
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Card className="p-6 tex-center mx-auto max-w-3xl">
      <div className="flex flex-col items-center justify-center">
        <CardHeader>
          <h1>Are you sure you want to delete this banner?</h1>
        </CardHeader>
        <CardDescription>
          Deleteing a banner is permanent and cannot be undone
        </CardDescription>
        <CardFooter className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href={`/banners`}>
                <Button variant={"outline"}>Cancel</Button>
              </Link>
            </div>
            <div className="fex items-center gap-3">
              <Button
                variant={"destructive"}
                disabled={isDeleting}
                onClick={() => hadnelDeleteBanner(params.id)}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  </>
                ) : (
                  <>Delete</>
                )}
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default page;
