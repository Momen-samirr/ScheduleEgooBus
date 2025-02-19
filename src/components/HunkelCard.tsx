import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { ComputerIcon } from "lucide-react";
import { getDbUser } from "@/actions/user.action";

const CompanyCard = async ({
  title,
  href,
  subTitle,
  subHref,
  veicle,
  availability,
  topic,
  src,
  adminTitle,
  adminRoute,
}: {
  title: string;
  subTitle?: string;
  veicle?: string;
  href?: string;
  subHref?: string;
  availability?: "Available Soon" | "Now Available";
  topic?: string;
  src?: string;
  adminTitle?: string;
  adminRoute?: string;
}) => {
  const isUnavailable = availability === "Available Soon";

  const dbUser = await getDbUser();
  return (
    <Card className={isUnavailable ? "opacity-50 cursor-not-allowed" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <CardTitle>{topic}</CardTitle>
          <div className="flex items-center justify-end">
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full items-center ${
                isUnavailable ? "bg-red-200 text-red-600" : "text-green-600"
              }`}
            >
              {isUnavailable ? "Coming Soon" : availability}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <div className="space-y-3 mb-3">
            <Avatar>
              <AvatarImage
                src={src ? "/ramdan.png" : "https://github.com/shadcn.png"}
              />
              <AvatarFallback>HC</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center gap-5">
            {href &&
              (isUnavailable ? (
                <Button variant={"outline"} disabled>
                  <ComputerIcon className="w-5 h-5 mr-3" />
                  {title}
                </Button>
              ) : (
                <Link href={href}>
                  <Button variant={"outline"}>
                    <ComputerIcon className="w-5 h-5 mr-3" />
                    {title}
                  </Button>
                </Link>
              ))}
            {subTitle &&
              subHref &&
              (isUnavailable ? (
                <Button variant={"outline"} disabled>
                  <ComputerIcon className="w-5 h-5 mr-3" />
                  {subTitle}
                </Button>
              ) : (
                <Link href={subHref}>
                  <Button variant={"outline"}>
                    <ComputerIcon className="w-5 h-5 mr-3" />
                    {subTitle}
                  </Button>
                </Link>
              ))}
            {adminRoute &&
              (dbUser?.role === "admin" ? (
                <Link href={adminRoute}>
                  <Button variant={"outline"}>
                    <ComputerIcon className="w-5 h-5 mr-3" />
                    {adminTitle}
                  </Button>
                </Link>
              ) : null)}
            <div>{veicle}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
