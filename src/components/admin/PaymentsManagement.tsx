import React, { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Link2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import AddPaymentDialog from "./AddPaymentDialog";

const PaymentsManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  return (
    <>
      <Card className="mb-12">
        <CardHeader className="flex items-center flex-row justify-between">
          <div>
            <CardTitle className="flex items-center gap-3">
              <Link2 className="text-primary size-5" />
              Payments
            </CardTitle>
            <CardDescription>
              Manage and oversee all Payments in your practice
            </CardDescription>
          </div>
          <Button
            variant={"default"}
            className="cursor-pointer"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="size-5 mr-1.5" />
            Add Payments
          </Button>
        </CardHeader>
      </Card>
      <AddPaymentDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </>
  );
};

export default PaymentsManagement;
