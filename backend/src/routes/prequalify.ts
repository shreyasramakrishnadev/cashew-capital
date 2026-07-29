import { Router, Request, Response } from "express";
import { PrequalifyRequest, PrequalifyResponse, RepaymentPlan } from "../types";

const router = Router();

function calculateRepaymentPlan(
  amount: number,
  apr: number,
  termMonths: number
): RepaymentPlan {
  const monthlyRate = apr / 100 / 12;
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  const totalRepayment = monthlyPayment * termMonths;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    termMonths,
    apr,
    totalInterest: Math.round((totalRepayment - amount) * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
  };
}

router.post("/", (req: Request, res: Response) => {
  const { income, requestedAmount, employmentStatus } =
    req.body as PrequalifyRequest;

  if (!income || !requestedAmount || !employmentStatus) {
    res.status(400).json({
      error: "income, requestedAmount, and employmentStatus are required",
    });
    return;
  }

  if (income <= 0 || requestedAmount <= 0) {
    res.status(400).json({ error: "income and requestedAmount must be positive" });
    return;
  }

  const maxAmount = Math.round(income * 0.4);
  const debtToIncome = requestedAmount / income;

  let approved = false;
  let apr = 24.99;
  let decision = "";

  if (employmentStatus === "unemployed") {
    decision =
      "We're unable to pre-qualify you at this time due to employment status. " +
      "Stable income is required for loan approval.";
  } else if (debtToIncome > 0.4) {
    decision =
      `The requested amount of $${requestedAmount.toLocaleString()} exceeds our maximum ` +
      `lending threshold of $${maxAmount.toLocaleString()} (40% of annual income). ` +
      `Consider applying for a lower amount.`;
  } else {
    approved = true;

    if (debtToIncome <= 0.15) {
      apr = employmentStatus === "employed" ? 6.99 : 8.99;
    } else if (debtToIncome <= 0.25) {
      apr = employmentStatus === "employed" ? 9.99 : 12.99;
    } else {
      apr = employmentStatus === "employed" ? 14.99 : 17.99;
    }

    const plan = calculateRepaymentPlan(requestedAmount, apr, 36);
    decision =
      `Congratulations! You're pre-qualified for up to $${maxAmount.toLocaleString()} ` +
      `at ${apr}% APR.`;

    const response: PrequalifyResponse = {
      approved,
      decision,
      maxAmount,
      apr,
      repaymentPlan: plan,
    };
    res.json(response);
    return;
  }

  const response: PrequalifyResponse = { approved, decision };
  res.json(response);
});

export default router;
