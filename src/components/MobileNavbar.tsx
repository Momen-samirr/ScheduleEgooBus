"use client";

import {
  BellIcon,
  HomeIcon,
  LayoutDashboard,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  OctagonAlert,
  SunIcon,
  UserIcon,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

function MobileNavbar(
  { notifications, egooNotifications }: any,
  { dbUser }: any
) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();
  const { theme, setTheme } = useTheme();

  const { user, getUser } = useKindeBrowserClient();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link className="relative" href="/notifications">
                    <BellIcon className="w-5 h-5" />
                    Notifications{" "}
                    <span className="absolute top-0 left-8 font-semibold text-sky-500">
                      {notifications}
                    </span>
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={`/egoonotification`} className="relative">
                    <OctagonAlert className="size-5" />
                    Egoo Notifications{" "}
                    <span className="absolute top-0 left-8 font-semibold text-sky-500">
                      {egooNotifications}
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                </Button>
                {/* <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/usersinfo">
                    <Users2 className="w-5 h-5" />
                    UsersInfo
                  </Link>
                </Button> */}
                <Button
                  variant={"ghost"}
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={`/usersplatform`}>
                    <Users2 className="w-5 h-5" />
                    Users
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={`/profile/${user?.email?.split("@")[0] || ""}`}>
                    <UserIcon className="w-5 h-5" />
                    Profile
                  </Link>
                </Button>
                <LogoutLink>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </LogoutLink>
              </>
            ) : (
              <LoginLink>
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </LoginLink>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
