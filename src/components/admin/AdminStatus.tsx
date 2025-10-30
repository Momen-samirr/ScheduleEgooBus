import React from "react";
import { Card, CardContent } from "../ui/card";
import { Calendar, Clock, User, UserCheck } from "lucide-react";

interface AdminStatusProps {
  totalUsers: number | undefined;
  totalAdminUsers: number | undefined;
  totalDriverUsers: number | undefined;
}

const AdminStatus = ({
  totalUsers,
  totalAdminUsers,
  totalDriverUsers,
}: AdminStatusProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-11">
      <Card className="border hover:border-primary/30 transition-colors duration-300 ">
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="w-11 h-11 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <User className="size-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{totalUsers}</div>
              <div className="text-muted-foreground text-sm">Total Users</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border hover:border-primary/30 transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <UserCheck className="size-6" />
            </div>
            <div>
              <div className="text-3xl font-bold">{totalAdminUsers}</div>
              <div className="text-muted-foreground text-sm">Total Admins</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border hover:border-primary/30 transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Calendar className="size-6" />
            </div>
            <div>
              <div className="text-3xl font-bold">{totalDriverUsers}</div>
              <div className="text-muted-foreground text-sm">Total Drivers</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <Card className="border hover:border-primary/30 transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Clock className="size-6" />
            </div>
            <div>
              <div className="text-3xl font-bold">
                {totalCompletedAppointments}
              </div>
              <div className="text-muted-foreground text-sm">
                Completed Appointments
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default AdminStatus;
