import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Driver = {
  id: string;
  name: string;
  image?: string;
  phone?: string;
  location?: string;
};

export type Trip = {
  id: string;
  route: string;
  time: string;
  date: string | Date;
  driver?: Driver;
};

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "route",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Route <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span>{new Date(row.getValue("date")).toDateString()}</span>
    ),
  },
  {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }) => {
      const driver = row.getValue("driver") as Driver;
      return driver ? (
        <Button variant="outline" onClick={() => alert(driver.name)}>
          View Driver
        </Button>
      ) : (
        <span>No driver assigned</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => console.log("Remove Driver", row.original.id)}
            >
              Remove Driver
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
