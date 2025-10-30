"use server";

import { PayType } from "@prisma/client";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const getPayments = async () => {
  try {
    const payments = await prisma.payment.findMany({});
    return payments;
  } catch (error) {
    console.log(error);
  }
};

interface createPaymentInputs {
  paymentText: string;
  paymentLabel: string;
  paymentType: PayType;
}

export const createPayment = async (input: createPaymentInputs) => {
  try {
    if (!input.paymentText || !input.paymentLabel || !input.paymentType)
      throw new Error("Payments Info Are All Required");

    const paymentCard = await prisma.payment.create({
      data: {
        ...input,
      },
    });
    revalidatePath("/admin");
    return paymentCard;
  } catch (error: any) {
    if (error?.code === "P2002") {
      throw new Error("A doctor with this email already exists");
    }
    throw new Error("Failed to create doctor");
  }
};
