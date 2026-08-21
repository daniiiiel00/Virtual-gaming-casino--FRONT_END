// Removed React
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Modal, Input, Button } from '../../shared/components';
import { normalizeApiError } from '../../shared/lib/api-client';
import toast from 'react-hot-toast';

const depositSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid amount'),
  reference: z.string().min(5, 'Reference must be at least 5 characters'),
});

type DepositFormData = z.infer<typeof depositSchema>;

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: DepositFormData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 'dep_123',
            status: 'pending',
            amount: data.amount,
            reference: data.reference
          });
        }, 1000);
      });
    },
    onSuccess: () => {
      toast.success('Deposit submitted! Pending approval.');
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(normalizeApiError(error).message);
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Funds">
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <p className="text-sm text-ink-muted mb-4">
          Send money to our official account and enter the transaction reference below.
        </p>
        
        <div className="p-3 rounded-xl bg-surface-raised border border-ink/10 mb-4">
          <p className="text-xs text-ink-muted">Official Account</p>
          <p className="text-sm font-medium text-ink font-display tracking-widest mt-1">1000 1234 5678</p>
          <p className="text-[10px] uppercase text-emerald mt-1">CBE Bank</p>
        </div>

        <Input 
          label="Amount (ETB)" 
          placeholder="e.g. 500" 
          {...register('amount')} 
          error={errors.amount?.message}
        />
        <Input 
          label="Transaction Reference" 
          placeholder="e.g. FT23..." 
          {...register('reference')} 
          error={errors.reference?.message}
        />

        <Button 
          type="submit" 
          className="w-full mt-2" 
          isLoading={mutation.isPending}
        >
          Submit Deposit
        </Button>
      </form>
    </Modal>
  );
}
