import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Modal, Input, Button, cn } from '../../shared/components';
import { Building2, Copy, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const BANKS = [
  { id: 'cbe', name: 'Commercial Bank of Ethiopia', short: 'CBE', account: '1000 1234 5678' },
  { id: 'telebirr', name: 'Telebirr', short: 'Telebirr', account: '+251 91 234 5678' },
  { id: 'awash', name: 'Awash Bank', short: 'Awash', account: '0132 4567 8901' },
];

const depositStep1Schema = z.object({
  bankId: z.string().min(1, 'Select a bank'),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid amount').refine(val => Number(val) >= 50, 'Minimum deposit is 50 ETB'),
});
type DepositStep1Data = z.infer<typeof depositStep1Schema>;

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedBank, setSelectedBank] = useState(BANKS[0].id);
  const [depositAmount, setDepositAmount] = useState('0');
  const [txRef, setTxRef] = useState('');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DepositStep1Data>({
    resolver: zodResolver(depositStep1Schema),
    defaultValues: { bankId: BANKS[0].id, amount: '' }
  });

  const amountValue = watch('amount');

  // Sync state
  useState(() => {
    setValue('bankId', selectedBank);
  });

  const onContinue = (data: DepositStep1Data) => {
    setDepositAmount(data.amount);
    setStep(2);
  };

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!txRef.trim()) throw new Error('Transaction reference is required');
      return new Promise((resolve) => setTimeout(resolve, 1500));
    },
    onSuccess: () => {
      toast.success('Deposit request sent to admin for approval! 🚀', { duration: 4000 });
      handleClose();
    },
    onError: (e: any) => {
      toast.error(e.message || 'Error submitting deposit');
    }
  });

  const handleClose = () => {
    setStep(1);
    setTxRef('');
    setValue('amount', '');
    onClose();
  };

  const activeBank = BANKS.find(b => b.id === selectedBank)!;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', { style: { background: '#1FAE7A', color: '#fff' } });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={step === 1 ? "Deposit Funds" : "Confirm Deposit"}>
      <div className="text-center mb-6 mt-2">
        <p className="text-xs text-ink-muted uppercase tracking-widest font-bold">Your Balance</p>
        <p className="text-3xl font-display font-black text-gold drop-shadow-md">1,500.00 ETB</p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleSubmit(onContinue)} className="space-y-5">
          <div className="space-y-3">
            <label className="text-xs font-bold text-ink uppercase tracking-widest ml-1">1. Select Payment Method</label>
            <div className="grid grid-cols-1 gap-2">
              {BANKS.map((bank) => (
                <div 
                  key={bank.id}
                  onClick={() => {
                    setSelectedBank(bank.id);
                    setValue('bankId', bank.id);
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                    selectedBank === bank.id 
                      ? "bg-emerald/10 border-emerald shadow-[0_0_15px_rgba(31,174,122,0.15)]" 
                      : "bg-surface border-white/5 hover:border-white/20"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shadow-inner",
                    selectedBank === bank.id ? "bg-emerald text-background" : "bg-background text-ink-muted"
                  )}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={cn("text-sm font-bold", selectedBank === bank.id ? "text-emerald" : "text-white")}>{bank.name}</p>
                    <p className="text-[10px] text-ink-muted mt-0.5">{bank.short}</p>
                  </div>
                  {selectedBank === bank.id && <CheckCircle2 className="w-5 h-5 text-emerald" />}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <label className="text-xs font-bold text-ink uppercase tracking-widest ml-1">2. Enter Amount</label>
            <div className="relative">
              <Input 
                type="number"
                placeholder="0.00" 
                {...register('amount')} 
                className="pl-6 text-xl font-display font-bold h-14"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted font-bold">Br</span>
            </div>
            {errors.amount && <p className="text-xs text-coral mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.amount.message}</p>}
          </div>

          <Button type="submit" disabled={!amountValue} className="w-full h-14 text-base font-bold bg-gradient-to-r from-emerald to-emerald/80 text-background border-0 shadow-[0_5px_15px_rgba(31,174,122,0.4)] mt-4 group">
            Continue <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          
          <div className="bg-surface-raised border border-white/10 p-4 rounded-[1.5rem] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 blur-2xl rounded-full"></div>
            <h4 className="text-xs font-bold text-ink-muted uppercase tracking-widest mb-3">Deposit Details</h4>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white font-medium">Amount</span>
              <span className="text-lg font-black text-emerald drop-shadow-sm">{depositAmount} ETB</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-3">
              <span className="text-sm text-white font-medium">Bank</span>
              <span className="text-sm font-bold text-white">{activeBank.name}</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] text-emerald uppercase tracking-widest font-bold">Transfer to this account:</p>
              <div className="flex items-center justify-between bg-background p-2 rounded-lg border border-emerald/20">
                <span className="font-mono text-lg font-bold text-white tracking-widest">{activeBank.account}</span>
                <button 
                  onClick={() => copyToClipboard(activeBank.account)}
                  className="bg-emerald/20 text-emerald hover:bg-emerald/30 p-2 rounded-md transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-white/5 p-4 rounded-[1.5rem] shadow-lg">
            <h4 className="text-xs font-bold text-ink-muted uppercase tracking-widest mb-3">Confirm Transaction</h4>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white uppercase ml-1">SMS or Transaction Message / Ref No.</label>
              <Input 
                value={txRef}
                onChange={(e) => setTxRef(e.target.value)}
                placeholder="Paste the SMS you received here..." 
                className="h-12 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={() => setStep(1)} className="flex-1 bg-surface-raised border border-white/5 text-ink hover:text-white transition-colors rounded-xl font-bold h-12">
              Back
            </Button>
            <Button 
              onClick={() => submitMutation.mutate()} 
              disabled={submitMutation.isPending || !txRef.trim()}
              isLoading={submitMutation.isPending}
              className="flex-2 w-[60%] bg-gradient-to-r from-emerald to-emerald/80 text-background border-0 shadow-[0_5px_15px_rgba(31,174,122,0.4)] rounded-xl font-bold h-12"
            >
              I have sent the money
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
