export function formatMoney(amountString: string, currency: string = 'ETB'): string {
  const amount = parseFloat(amountString);
  if (isNaN(amount)) return `0.00 ${currency}`;
  
  return new Intl.NumberFormat('en-ET', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount) + ` ${currency}`;
}
