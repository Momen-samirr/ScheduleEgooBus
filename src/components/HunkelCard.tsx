import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { ComputerIcon } from "lucide-react";
import { getDbUser } from "@/actions/user.action";
import { getServerTime } from "@/actions/time.action";

const CompanyCard = async ({
  title,
  href,
  subTitle,
  subHref,
  veicle,
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
  const dbUser = await getDbUser();
  const serverHour = await getServerTime();

  const isAdmin = dbUser?.role === "admin";
  const availability = isAdmin
    ? "Now Available"
    : serverHour >= 9 && serverHour < 21
    ? "Now Available"
    : "Available Soon";

  const isUnavailable = !isAdmin && availability === "Available Soon";

  return (
    <Card className={isUnavailable ? "opacity-50 cursor-not-allowed" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <CardTitle>{topic}</CardTitle>
          <div className="flex items-center justify-end">
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                isUnavailable
                  ? "bg-red-200 text-red-600"
                  : "bg-green-200 text-green-600"
              }`}
            >
              {availability}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <div className="space-y-3 mb-3">
            <Avatar>
              <AvatarImage src={src ? src : "https://github.com/shadcn.png"} />
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
            {dbUser?.role === "admin" && (
              <Link href={`/dashboard/adminShow`}>
                <Button variant={"outline"}>
                  <ComputerIcon className="w-5 h-5 mr-3" />
                  {adminTitle}
                </Button>
              </Link>
            )}
            {dbUser?.role === "employee" && (
              <Link href={`/dashboard/adminShow`}>
                <Button variant={"outline"}>
                  <ComputerIcon className="w-5 h-5 mr-3" />
                  {adminTitle}
                </Button>
              </Link>
            )}
            <div>{veicle}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
