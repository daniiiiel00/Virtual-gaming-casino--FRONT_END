// Removed React
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Input, Button } from '../../shared/components';
import { normalizeApiError } from '../../shared/lib/api-client';
import toast from 'react-hot-toast';

const withdrawalSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid amount'),
  accountNumber: z.string().min(6, 'Enter a valid account number'),
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashBalance: string;
}

export function WithdrawalModal({ isOpen, onClose, cashBalance }: WithdrawalModalProps) {
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: WithdrawalFormData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 'wd_123',
            status: 'pending',
            amount: data.amount,
          });
        }, 1000);
      });
    },
    onSuccess: () => {
      toast.success('Withdrawal request submitted!');
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(normalizeApiError(error).message);
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Funds">
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <div className="flex justify-between items-center bg-surface-raised p-3 rounded-xl border border-ink/10 mb-4">
          <span className="text-sm text-ink-muted">Available Cash</span>
          <span className="font-display font-medium text-ink">{cashBalance} ETB</span>
        </div>

        <Input 
          label="Amount to withdraw (ETB)" 
          placeholder="e.g. 200" 
          {...register('amount')} 
          error={errors.amount?.message}
        />
        <Input 
          label="Your Account Number" 
          placeholder="e.g. 1000..." 
          {...register('accountNumber')} 
          error={errors.accountNumber?.message}
        />

        <Button 
          type="submit" 
          className="w-full mt-2" 
          variant="secondary"
          isLoading={mutation.isPending}
        >
          Request Withdrawal
        </Button>
      </form>
    </Modal>
  );
}
