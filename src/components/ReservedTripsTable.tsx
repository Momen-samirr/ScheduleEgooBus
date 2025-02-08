import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ReservedTripsTable = ({ reservedTrips }: any) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Route</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservedTrips.map((trip: any) => (
          <TableRow key={trip.id}>
            <TableCell className="font-medium">{trip.route}</TableCell>
            <TableCell>{trip.time}</TableCell>
            {/* <TableCell>{trip}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ReservedTripsTable;
