"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import DropDownMenuTrip from "./DropDownMenuTrip";
import { removeDriverFromTrip } from "@/actions/hunkel.action";
import toast from "react-hot-toast";
import DropDownMenuEmployee from "./DropDownMenuEmployee";

interface Trip {
  id: string;
  time: string;
  date: Date;
  reservedTripStatus: string | null;
  driver: {
    name: string | null;
    phone: string | null;
    location: string | null;
    image: string | null;
  } | null;
  route: string;
}

interface DataTableProps {
  trips: Trip[];
}

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "route",
    header: "Route",
    cell: ({ row }) => <div>{row.getValue("route")}</div>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <div>{row.getValue("time")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div>{date.toLocaleDateString()}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return (
        new Date(row.getValue(columnId)).toDateString() ===
        new Date(filterValue).toDateString()
      );
    },
  },
  {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }) => {
      const driver = row.getValue("driver") as Trip["driver"];
      if (!driver || !driver.image) return <span>No driver assigned</span>;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Driver</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Driver Details</DialogTitle>
              <DialogDescription>
                Information about the assigned driver.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-6">
              <img
                src={driver?.image}
                alt={driver?.name || "Unknown Driver"}
                className="w-16 h-16 rounded-full"
              />
              <h3 className="font-semibold">{driver?.name || "N/A"}</h3>
              <p className="text-sm text-muted-foreground">
                {driver?.phone || "No phone"}
              </p>
              <p className="text-sm text-muted-foreground">
                {driver?.location || "No location"}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const trip = row.original;
      return <DropDownMenuEmployee trip={trip} />;
    },
  },
];

export default function TableData({ trips }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const table = useReactTable({
    data: trips,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center space-x-4 py-4">
        <Input
          placeholder="Filter routes..."
          value={(table.getColumn("route")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("route")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Input
          placeholder="Filter time..."
          value={(table.getColumn("time")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("time")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" /> Filter by Date
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <DatePicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date ?? undefined);
                table
                  .getColumn("date")
                  ?.setFilterValue(date?.toISOString() ?? "");
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <>
                  {row?.original?.reservedTripStatus === "done" ? (
                    <TableCell key={cell.id} className="opacity-30">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ) : (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )}
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
