import { getTasks } from "@/actions/task.action";
import { getDbUser } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import TaskCard from "@/components/TaskCard";
import React from "react";

const UpScheduleRoute = async () => {
  const tasks = await getTasks();
  const dbUser = await getDbUser();
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        <CreatePost />
      </div>
      {tasks?.map((task) => (
        <div key={task?.id}>
          <TaskCard post={task} dbUserId={dbUser?.id ?? ""} key={task?.id} />
        </div>
      ))}
    </div>
  );
};

export default UpScheduleRoute;
