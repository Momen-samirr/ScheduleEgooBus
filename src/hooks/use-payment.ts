"use client";

import { createPayment, getPayments } from "@/lib/actions/payment.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetPayments = () => {
  const result = useQuery({
    queryKey: ["getAllPayments"],
    queryFn: getPayments,
  });
  return result;
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: ["createNewPay"],
    mutationFn: createPayment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllPayments"] }),
  });
  return result;
};
