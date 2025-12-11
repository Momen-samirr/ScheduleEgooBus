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
import { Button } from "../ui/button";
import { useCreatePayment } from "@/hooks/use-payment";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

type PaymentType = "BTC" | "BTB";

interface AddPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPaymentDialog = ({ isOpen, onClose }: AddPaymentDialogProps) => {
  const [newPayment, setNewPayment] = useState({
    paymentText: "",
    paymentLabel: "",
    paymentType: "BTC" as PaymentType,
  });

  const createPaymentsMutuation = useCreatePayment();

  const handelSave = () => {
    // Validate form fields
    if (!newPayment.paymentText.trim()) {
      toast.error("Payment text is required");
      return;
    }
    if (!newPayment.paymentLabel.trim()) {
      toast.error("Payment label is required");
      return;
    }
    if (!newPayment.paymentType) {
      toast.error("Payment type is required");
      return;
    }

    // Ensure we're passing a plain object with only serializable values
    const paymentData = {
      paymentText: newPayment.paymentText.trim(),
      paymentLabel: newPayment.paymentLabel.trim(),
      paymentType: newPayment.paymentType,
    };

    createPaymentsMutuation.mutate(paymentData, {
      onSuccess: (result) => {
        if (result?.success) {
          toast.success("Payment added successfully");
          handelClose();
        } else {
          toast.error(result?.error || "Failed to create payment");
        }
      },
      onError: () => {
        toast.error("Failed to create payment. Please try again.");
      },
    });
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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !createPaymentsMutuation.isPending) {
          handelClose();
        }
      }}
    >
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
                    paymentType: value as PaymentType,
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
            disabled={createPaymentsMutuation.isPending}
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
