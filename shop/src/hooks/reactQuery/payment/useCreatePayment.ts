import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { paymentCart } from '@/service/paymentService';
import { PaymentFormType } from '@/types/paymentType';

export function useCreatePayment() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({ mutationFn: paymentCart });

  return {
    createPayment: (data: PaymentFormType, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders, QueryKeys.Cart] });
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isCreatePaymentLoading: createMutation.isPending,
  };
}
