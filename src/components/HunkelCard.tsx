import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { ComputerIcon } from "lucide-react";

const CompanyCard = ({ title }: { title: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <div className="space-y-3 mb-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>HC</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Link href={"/hunkel"}>
                <Button variant={"outline"}>
                  <ComputerIcon className="w-5 h-5 mr-3" />
                  {title}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CompanyCard;
