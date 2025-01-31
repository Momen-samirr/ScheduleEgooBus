import {
  BellIcon,
  DatabaseIcon,
  HomeIcon,
  LayoutDashboard,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";
import { getDbUser } from "@/actions/user.action";

async function DesktopNavbar() {
  const user = await currentUser();

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
              <Link href="/banners">
                <DatabaseIcon className="w-5 h-5" />
                <span className="hidden lg:inline">Banner</span>
              </Link>
            </Button>
          )}
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ??
                user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-5 h-5" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
      <ModeToggle />
    </div>
  );
}
export default DesktopNavbar;
