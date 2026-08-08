import { RepaymentPlan } from "../types";

export interface LoanPaymentInput {
  loan_amount: number;
  apr: number;
  term_months: number;
}

export const calculateLoanPaymentToolSchema = {
  name: "calculate_loan_payment",
  description:
    "Calculate monthly payment, total interest, and total repayment for a fixed-rate installment loan.",
  input_schema: {
    type: "object",
    properties: {
      loan_amount: {
        type: "number",
        description: "Principal loan amount in dollars",
      },
      apr: {
        type: "number",
        description: "Annual percentage rate (e.g. 8.99 for 8.99%)",
      },
      term_months: {
        type: "number",
        description: "Loan term length in months",
      },
    },
    required: ["loan_amount", "apr", "term_months"],
  },
};

export function calculateLoanPayment(input: LoanPaymentInput): RepaymentPlan {
  const { loan_amount, apr, term_months } = input;

  if (loan_amount <= 0 || term_months <= 0) {
    throw new Error("loan_amount and term_months must be positive");
  }
  if (apr < 0) {
    throw new Error("apr must be non-negative");
  }

  const monthlyRate = apr / 100 / 12;
  const monthlyPayment =
    monthlyRate === 0
      ? loan_amount / term_months
      : (loan_amount * monthlyRate * Math.pow(1 + monthlyRate, term_months)) /
        (Math.pow(1 + monthlyRate, term_months) - 1);
  const totalRepayment = monthlyPayment * term_months;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    termMonths: term_months,
    apr,
    totalInterest: Math.round((totalRepayment - loan_amount) * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
  };
}
