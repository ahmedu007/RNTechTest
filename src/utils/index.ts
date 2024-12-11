export const calculateBreakdown = (balance: number) => {
  const taxRate = 0.15;
  const reasonablePercentage = 0.01;
  const annualRate = 0.05;

  // Convert annual interest rate to monthly interest
  const monthlyInterestRate = annualRate / 12;

  const interest = (balance * monthlyInterestRate).toFixed(2);
  const fees = balance * reasonablePercentage;

  // Taxes applied to the net balance after fees
  const netBalanceAfterFees = balance - fees;
  const taxes = (netBalanceAfterFees * taxRate).toFixed(2);

  // Calculate available balance after fees and taxes, and adding interest
  const availableBalance = Number(
    (netBalanceAfterFees - parseFloat(taxes) + parseFloat(interest)).toFixed(2),
  );

  return {
    interest,
    fees: fees.toFixed(2), //ensure proper formatting,
    taxes,
    availableBalance,
  };
};
