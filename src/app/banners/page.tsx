import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatabaseIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const BannerRoute = () => {
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild variant={"outline"}>
          <Link href={"/banners/create"}>
            <DatabaseIcon className="w-5 h-5" />
            Banner
          </Link>
        </Button>
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
            </Table>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};

export default BannerRoute;
