import {
  BellIcon,
  DatabaseIcon,
  HomeIcon,
  LayoutDashboard,
  UserIcon,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { getDbUser } from "@/actions/user.action";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { getUnReadNotifications } from "@/actions/notification.action";

async function DesktopNavbar() {
  const { getUser } = getKindeServerSession();

  const notifications = getUnReadNotifications();

  const user = await getUser();

  const dbUser = await getDbUser();
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link className="relative" href="/notifications">
              <BellIcon className="w-5 h-5" />
              <span className="hidden lg:inline">
                Notifications{" "}
                <span className="absolute top-0 right-1 text-sky-500 font-semibold">
                  {(await notifications).length}
                </span>
              </span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden lg:inline">Dashboard</span>
            </Link>
          </Button>
          {dbUser?.role === "admin" && (
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/usersplatform">
                <DatabaseIcon className="w-5 h-5" />
                <span className="hidden lg:inline">Users</span>
              </Link>
            </Button>
          )}
          {dbUser?.role === "employee" && (
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/usersplatform">
                <DatabaseIcon className="w-5 h-5" />
                <span className="hidden lg:inline">Users</span>
              </Link>
            </Button>
          )}
          {dbUser?.role === "admin" && (
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/banners">
                <DatabaseIcon className="w-5 h-5" />
                <span className="hidden lg:inline">Banner</span>
              </Link>
            </Button>
          )}
          {dbUser?.role === "admin" && (
            <Button
              variant={"ghost"}
              className="flex items-center gap-3"
              asChild
            >
              <Link href={"/usersinfo"}>
                <Users2 className="size-5" />
                <span className="hidden lg:inline">Users Info</span>
              </Link>
            </Button>
          )}
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                dbUser?.username || dbUser?.email.split("@")[0]
              }`}
            >
              <UserIcon className="w-5 h-5" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <Button variant="default" className="flex items-center gap-2" asChild>
            <LogoutLink>Log out</LogoutLink>
          </Button>
        </>
      ) : (
        <Button variant={"ghost"}>
          <LoginLink>Login</LoginLink>
        </Button>
      )}
      <ModeToggle />
    </div>
  );
}
export default DesktopNavbar;
