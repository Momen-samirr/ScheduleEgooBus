import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PayType } from "@prisma/client";
import { Button } from "../ui/button";
import { useCreatePayment } from "@/hooks/use-payment";
import { Loader } from "lucide-react";

interface AddPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPaymentDialog = ({ isOpen, onClose }: AddPaymentDialogProps) => {
  const [newPayment, setNewPayment] = useState({
    paymentText: "",
    paymentLabel: "",
    paymentType: "BTC" as PayType,
  });

  const createPaymentsMutuation = useCreatePayment();

  const handelSave = () => {
    createPaymentsMutuation.mutate(
      { ...newPayment },
      { onSuccess: handelClose }
    );
  };
  const handelClose = () => {
    onClose();
    setNewPayment({
      paymentText: "",
      paymentLabel: "",
      paymentType: "BTC",
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={handelClose}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Payment</DialogTitle>
          <DialogDescription>
            Add a new Payment to your practice.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-3">
          <div className="space-y-3">
            <Label>Text</Label>
            <Input
              type="text"
              placeholder="Put Paymnets Week"
              value={newPayment.paymentText}
              onChange={(e) =>
                setNewPayment({ ...newPayment, paymentText: e.target.value })
              }
            />
          </div>
          <div className="space-y-3">
            <Label>Payment Label</Label>
            <Input
              type="text"
              placeholder="Put Payments Week"
              value={newPayment.paymentLabel}
              onChange={(e) =>
                setNewPayment({ ...newPayment, paymentLabel: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <Select
                value={newPayment.paymentType || ""}
                onValueChange={(value) =>
                  setNewPayment({
                    ...newPayment,
                    paymentType: value as PayType,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="BTB">BTB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={handelClose}>
            Cancle
          </Button>
          <Button
            variant={"default"}
            className="cursor-pointer"
            onClick={handelSave}
          >
            {createPaymentsMutuation.isPending ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              <span>Add Pay</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentDialog;
