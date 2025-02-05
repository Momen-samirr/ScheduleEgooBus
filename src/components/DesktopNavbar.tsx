import {
  BellIcon,
  DatabaseIcon,
  HomeIcon,
  LayoutDashboard,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";
import { getDbUser } from "@/actions/user.action";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

async function DesktopNavbar() {
  // const user = await currentUser();

  const { getUser } = getKindeServerSession();

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
            <Link href="/notifications">
              <BellIcon className="w-5 h-5" />
              <span className="hidden lg:inline">Notifications</span>
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
          {dbUser?.role === "admin" && (
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/banners">
                <DatabaseIcon className="w-5 h-5" />
                <span className="hidden lg:inline">Banner</span>
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
