import { deleteBanner, getBanners } from "@/actions/banner.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatabaseIcon, MoreHorizontalIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const fetchBanners = async () => {
  const data = await getBanners();
  if (!data) return [];
  return data;
};

const BannerRoute = async () => {
  const banners = await fetchBanners();

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant={"outline"}>
            <Link href={"/banners/create"}>
              <DatabaseIcon className="w-5 h-5" />
              Create Banner
            </Link>
          </Button>
        </div>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Manage Banners</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
          <CardContent>
            <Table className="mt-3">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(banners) ? (
                  banners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell>
                        <img
                          src={banner.imageString}
                          alt={banner.title}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell>{banner.title}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                              <MoreHorizontalIcon className="w-5 h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Separator />
                            <DropdownMenuItem>
                              <Link
                                href={`/banners/delete/${banner.id}`}
                                className="flex items-center gap-3"
                              >
                                <Trash2 className="w-5 h-5 text-red-500" />
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      {banners.error || "Failed to fetch banners."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};

export default BannerRoute;
