export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  response: string;
}

export interface PrequalifyRequest {
  income: number;
  requestedAmount: number;
  employmentStatus: "employed" | "self-employed" | "unemployed" | "retired";
}

export interface RepaymentPlan {
  monthlyPayment: number;
  termMonths: number;
  apr: number;
  totalInterest: number;
  totalRepayment: number;
}

export interface PrequalifyResponse {
  approved: boolean;
  decision: string;
  maxAmount?: number;
  apr?: number;
  repaymentPlan?: RepaymentPlan;
}
