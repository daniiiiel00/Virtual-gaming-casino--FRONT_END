import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Input, Button, cn } from '../../shared/components';
import { Building2, CheckCircle2, AlertCircle, ArrowDownToLine } from 'lucide-react';
import toast from 'react-hot-toast';

const BANKS = [
  { id: 'cbe', name: 'Commercial Bank of Ethiopia', short: 'CBE' },
  { id: 'telebirr', name: 'Telebirr', short: 'Telebirr' },
  { id: 'awash', name: 'Awash Bank', short: 'Awash' },
];

const withdrawalSchema = z.object({
  bankId: z.string().min(1, 'Select a bank'),
  accountNumber: z.string().min(6, 'Enter a valid account/phone number'),
  holderName: z.string().min(3, 'Enter full holder name'),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid amount').refine(val => Number(val) >= 100, 'Minimum withdrawal is 100 ETB'),
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashBalance: string;
}

export function WithdrawalModal({ isOpen, onClose, cashBalance }: WithdrawalModalProps) {
  const queryClient = useQueryClient();
  const [selectedBank, setSelectedBank] = useState(BANKS[0].id);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: { bankId: BANKS[0].id }
  });

  const amountValue = watch('amount');
  
  // Sync state
  useState(() => {
    setValue('bankId', selectedBank);
  });

  const mutation = useMutation({
    mutationFn: async (data: WithdrawalFormData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: 'wd_123', status: 'pending', amount: data.amount });
        }, 1500);
      });
    },
    onSuccess: () => {
      toast.success('Withdrawal request sent to admin!', { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      reset();
      onClose();
    },
    onError: (e: any) => {
      toast.error(e.message || 'Error submitting withdrawal');
    }
  });

  const handleClose = () => {
    reset();
    setSelectedBank(BANKS[0].id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Withdraw Funds">
      
      {/* Balance display */}
      <div className="bg-gradient-to-br from-surface-raised to-surface border border-white/5 rounded-[1.5rem] p-4 mb-6 shadow-md relative overflow-hidden flex items-center justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-2xl rounded-full"></div>
        <div className="relative z-10">
          <p className="text-[10px] text-ink-muted uppercase tracking-widest font-bold mb-1">Available Cash</p>
          <p className="text-2xl font-display font-black text-white">{cashBalance} <span className="text-sm font-medium text-white/50">ETB</span></p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center relative z-10 border border-gold/20">
          <ArrowDownToLine className="w-6 h-6 text-gold" />
        </div>
      </div>

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
        
        {/* Bank Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-ink uppercase tracking-widest ml-1">1. Select Bank</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {BANKS.map((bank) => (
              <div 
                key={bank.id}
                onClick={() => {
                  setSelectedBank(bank.id);
                  setValue('bankId', bank.id);
                }}
                className={cn(
                  "flex-shrink-0 w-28 flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer relative",
                  selectedBank === bank.id 
                    ? "bg-gold/10 border-gold shadow-[0_0_15px_rgba(232,169,59,0.15)]" 
                    : "bg-surface border-white/5 hover:border-white/20"
                )}
              >
                {selectedBank === bank.id && (
                  <div className="absolute top-1 right-1">
                    <CheckCircle2 className="w-3 h-3 text-gold" />
                  </div>
                )}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-inner",
                  selectedBank === bank.id ? "bg-gold text-background" : "bg-background text-ink-muted"
                )}>
                  <Building2 className="w-5 h-5" />
                </div>
                <p className={cn("text-[10px] font-bold text-center", selectedBank === bank.id ? "text-gold" : "text-white")}>{bank.short}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-ink uppercase tracking-widest ml-1">2. Account Details</label>
          <div className="space-y-3 p-4 rounded-[1.5rem] bg-surface border border-white/5 shadow-inner">
            <div>
              <Input 
                placeholder="Account / Phone Number" 
                {...register('accountNumber')} 
                className="bg-background h-12 text-sm"
              />
              {errors.accountNumber && <p className="text-[10px] text-coral mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.accountNumber.message}</p>}
            </div>
            <div>
              <Input 
                placeholder="Account Holder Full Name" 
                {...register('holderName')} 
                className="bg-background h-12 text-sm"
              />
              {errors.holderName && <p className="text-[10px] text-coral mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.holderName.message}</p>}
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-ink uppercase tracking-widest ml-1">3. Withdraw Amount</label>
          <div className="relative">
            <Input 
              type="number"
              placeholder="0.00 ETB" 
              {...register('amount')} 
              className="pl-6 text-xl font-display font-bold h-14"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <Button type="button" variant="secondary" className="h-6 text-[10px] px-2 py-0 bg-gold/20 text-gold hover:bg-gold/30 border border-gold/30" onClick={() => setValue('amount', cashBalance.replace(/,/g, ''))}>MAX</Button>
            </div>
          </div>
          {errors.amount && <p className="text-[10px] text-coral mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.amount.message}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={mutation.isPending || !amountValue} 
          isLoading={mutation.isPending}
          className="w-full h-14 text-base font-bold bg-gradient-to-r from-gold to-amber-500 text-background border-0 shadow-[0_5px_15px_rgba(232,169,59,0.4)] mt-4 group"
        >
          Withdraw Funds
        </Button>
      </form>
    </Modal>
  );
}
