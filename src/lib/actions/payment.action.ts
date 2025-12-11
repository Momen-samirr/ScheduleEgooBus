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
    if (!input.paymentText || !input.paymentLabel || !input.paymentType) {
      return {
        success: false,
        error: "Payments Info Are All Required",
      };
    }

    const paymentCard = await prisma.payment.create({
      data: {
        paymentText: input.paymentText,
        paymentLabel: input.paymentLabel,
        paymentType: input.paymentType,
      },
    });
    revalidatePath("/admin");
    // Return only serializable data
    return {
      success: true,
      data: {
        id: paymentCard.id,
        paymentText: paymentCard.paymentText,
        paymentLabel: paymentCard.paymentLabel,
        paymentType: paymentCard.paymentType,
      },
    };
  } catch (error: any) {
    // Extract only the error message string and return as plain object
    const errorMessage =
      error?.code === "P2002"
        ? "A payment with this information already exists"
        : typeof error?.message === "string"
        ? error.message
        : "Failed to create payment";
    return {
      success: false,
      error: errorMessage,
    };
  }
};
