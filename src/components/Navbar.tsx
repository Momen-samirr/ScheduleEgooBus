import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
// import { currentUser } from "@clerk/nextjs/server";
import { getDbUser, syncUser } from "@/actions/user.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUnReadNotifications } from "@/actions/notification.action";
import { getUnReadEgooNotifications } from "@/actions/tasknotfi.action";

async function Navbar() {
  // const user = await currentUser();
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  if (user) await syncUser();

  const notifications = await getUnReadNotifications();

  const egooNotifications = await getUnReadEgooNotifications();
  const dbUser = await getDbUser();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              Egoo<span className="text-blue-500">Bus</span>
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar
            notifications={notifications?.length}
            egooNotifications={egooNotifications?.length}
            dbUser={dbUser}
          />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
