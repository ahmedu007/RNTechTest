import { calculateBreakdown } from './index';

describe('calculateBreakdown', () => {
  const balance = 1000; // Use a fixed balance for consistent testing

  it('should calculate monthly interest correctly', () => {
    const expectedInterest = ((balance * 0.05) / 12).toFixed(2);

    const result = calculateBreakdown(balance);

    expect(result.interest).toBe(expectedInterest);
  });

  it('should calculate fees correctly', () => {
    const expectedFees = (balance * 0.01).toFixed(2);

    const result = calculateBreakdown(balance);

    expect(result.fees).toBe(expectedFees);
  });

  it('should calculate taxes correctly, on net balance', () => {
    const feeAmount = balance * 0.01;
    const netBalance = balance - feeAmount;
    const expectedTaxes = (netBalance * 0.15).toFixed(2);

    const result = calculateBreakdown(balance);

    expect(result.taxes).toBe(expectedTaxes);
  });

  it('should calculate available balance correctly', () => {
    const feeAmount = balance * 0.01;
    const netBalance = balance - feeAmount;
    const taxAmount = netBalance * 0.15;
    const expectedInterest = (balance * 0.05) / 12;
    const expectedAvailableBalance = netBalance - taxAmount + expectedInterest;

    const result = calculateBreakdown(balance);

    expect(result.availableBalance).toBeCloseTo(expectedAvailableBalance, 2); // Use toBeCloseTo for floating-point comparison
  });
  it('should calculate the correct breakdown for a given balance', () => {
    const balance = 1000;
    const result = calculateBreakdown(balance);

    expect(result).toEqual({
      availableBalance: 845.67,
      fees: '10.00',
      interest: '4.17',
      taxes: '148.50',
    });
  });

  it('should handle zero balance correctly', () => {
    const balance = 0;
    const result = calculateBreakdown(balance);

    expect(result).toEqual({
      interest: '0.00',
      fees: '0.00',
      taxes: '0.00',
      availableBalance: 0,
    });
  });

  it('should handle negative balance correctly', () => {
    const balance = -1000;
    const result = calculateBreakdown(balance);

    expect(result).toEqual({
      availableBalance: -845.67,
      fees: '-10.00',
      interest: '-4.17',
      taxes: '-148.50',
    });
  });
});
