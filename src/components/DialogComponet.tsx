import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const DialogComponet = ({ routeInfo }: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Driver</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>EgooBus With Mo2 </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 justify-center mx-auto">
          <div className="flex flex-col gap-3">
            <img
              src={routeInfo?.driver?.image}
              alt={routeInfo?.driver?.name}
              className="size-20 rounded-full flex justify-center mx-auto"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sky-500">Driver:</span>
              {routeInfo?.driver?.name}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sky-500">Phone:</span>
              {routeInfo?.driver?.phone}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sky-500">Location:</span>
              {routeInfo?.driver?.location}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponet;
