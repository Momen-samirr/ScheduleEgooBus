"use client";
import {
  getNotifications,
  markNotificationsAsRead,
} from "@/actions/tasknotfi.action";
import { NotificationsSkeleton } from "@/components/NotificationSkeleton";
import RefreshButton from "@/components/RefreshButtuon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircleIcon, Plus, UserPlusIcon } from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Notifications = Awaited<ReturnType<typeof getNotifications>>;
type Notification = Notifications[number];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "CREATE":
      return <Plus className="size-5 text-green-500" />;
    case "COMMENT":
      return <MessageCircleIcon className="size-5 text-blue-500" />;
    case "FOLLOW":
      return <UserPlusIcon className="size-5 text-green-500" />;
    default:
      return null;
  }
};

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await getNotifications();
        setNotifications(data);

        const unreadIds = data.filter((n) => !n.read).map((n) => n.id);
        if (unreadIds.length > 0) await markNotificationsAsRead(unreadIds);
      } catch (error) {
        toast.error("Failed to fetch notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading) return <NotificationsSkeleton />;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <RefreshButton />
            <span className="text-sm text-muted-foreground">
              {notifications.filter((n) => !n.read).length} unread
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border-b hover:bg-muted/25 transition-colors ${
                    !notification.read ? "bg-muted/50" : ""
                  }`}
                >
                  <Avatar className="mt-1">
                    <AvatarImage
                      src={notification.creator.image ?? "/avatar.png"}
                    />
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <span>
                        <span className="font-medium">
                          {notification.creator.name ??
                            notification.creator.username}
                        </span>{" "}
                        {notification.type === "FOLLOW"
                          ? "started following you"
                          : notification.type === "CREATE"
                          ? "created a task"
                          : "commented on your post"}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      <span>{notification?.creator?.phone || "No phone"}</span>
                    </div>

                    {notification.task &&
                      (notification.type === "CREATE" ||
                        notification.type === "COMMENT") && (
                        <div className="pl-6 space-y-2">
                          <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
                            <p>{notification?.task?.content}</p>
                            {notification?.task?.image && (
                              <img
                                src={notification?.task?.image}
                                alt={notification?.task?.content}
                                className="mt-1.5 rounded-md w-full max-w-[300px] h-auto object-cover"
                              />
                            )}
                          </div>

                          {notification.type === "COMMENT" &&
                            notification.comment && (
                              <div className="text-sm p-2 bg-accent/50 rounded-md">
                                {notification.comment.content}
                              </div>
                            )}
                        </div>
                      )}

                    <p className="text-sm text-muted-foreground pl-6">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
export default NotificationsPage;
