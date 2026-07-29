import { ChatMessage } from "../types";

function randomLatency(): Promise<void> {
  const ms = 300 + Math.floor(Math.random() * 1200);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractNumber(text: string): number | null {
  const match = text.replace(/,/g, "").match(/\$?(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}

/**
 * Mock LLM response generator.
 * Swap this function body with a Bedrock API call when ready.
 */
export async function generateChatResponse(
  messages: ChatMessage[]
): Promise<string> {
  await randomLatency();

  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content.toLowerCase() ?? "";

  if (
    lastUserMessage.includes("credit score") ||
    lastUserMessage.includes("credit rating")
  ) {
    const score = extractNumber(lastUserMessage);
    if (score && score >= 740) {
      return (
        "With a credit score in the excellent range, you're in great shape! " +
        "You'd likely qualify for our best rates — starting around 6.99% APR on personal loans. " +
        "Would you like me to run a full pre-qualification? Just share your annual income and desired loan amount."
      );
    }
    if (score && score >= 670) {
      return (
        "A credit score in the good range opens up solid options with Cashew Capital. " +
        "You could expect rates around 9.99%–14.99% APR depending on income and loan amount. " +
        "Want me to check your pre-qualification? Tell me your income and how much you'd like to borrow."
      );
    }
    if (score && score < 670) {
      return (
        "I appreciate you sharing that. While your credit score may limit some options, " +
        "Cashew Capital offers credit-building loans starting at 14.99% APR that can help improve your score over time. " +
        "We also have debt consolidation products that might lower your overall monthly payments. " +
        "What's your annual income? I can see what you might qualify for."
      );
    }
    return (
      "Your credit score is a key factor in determining your rate. Generally:\n\n" +
      "• 740+ (Excellent): Best rates, from 6.99% APR\n" +
      "• 670–739 (Good): Competitive rates, 9.99%–14.99% APR\n" +
      "• Below 670: Credit-building options from 14.99% APR\n\n" +
      "What's your approximate credit score? I can give you a more specific estimate."
    );
  }

  if (
    lastUserMessage.includes("income") ||
    lastUserMessage.includes("salary") ||
    lastUserMessage.includes("earn")
  ) {
    const income = extractNumber(lastUserMessage);
    if (income) {
      const maxLoan = Math.round(income * 0.4);
      return (
        `Thanks for sharing! Based on an annual income of $${income.toLocaleString()}, ` +
        `you could potentially qualify for loans up to $${maxLoan.toLocaleString()} ` +
        `(roughly 40% of annual income).\n\n` +
        `How much are you looking to borrow? I can put together a repayment estimate for you.`
      );
    }
    return (
      "Knowing your income helps me estimate what you can comfortably borrow. " +
      "What's your annual income before taxes? For example, \"$75,000 per year.\""
    );
  }

  if (
    lastUserMessage.includes("borrow") ||
    lastUserMessage.includes("loan amount") ||
    lastUserMessage.includes("$")
  ) {
    const amount = extractNumber(lastUserMessage);
    if (amount) {
      const monthlyRate = 0.0899 / 12;
      const termMonths = 36;
      const monthly =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1);
      const totalRepayment = monthly * termMonths;
      return (
        `For a $${amount.toLocaleString()} loan at an estimated 8.99% APR over 36 months:\n\n` +
        `• Monthly payment: ~$${monthly.toFixed(2)}\n` +
        `• Total repayment: ~$${totalRepayment.toFixed(2)}\n` +
        `• Total interest: ~$${(totalRepayment - amount).toFixed(2)}\n\n` +
        `This is a preliminary estimate — your actual rate depends on credit score and income. ` +
        `Want me to run a full pre-qualification?`
      );
    }
    return (
      "I can help estimate your repayment plan! How much are you looking to borrow? " +
      "Our personal loans range from $1,000 to $50,000."
    );
  }

  if (
    lastUserMessage.includes("debt") ||
    lastUserMessage.includes("consolidat")
  ) {
    return (
      "Debt consolidation is one of our most popular products! By rolling high-interest credit card " +
      "balances into a single fixed-rate loan, many customers save 30–50% on interest.\n\n" +
      "To see if it's right for you, I'd need to know:\n" +
      "1. Your total debt amount\n" +
      "2. Your current average interest rate\n" +
      "3. Your annual income\n\n" +
      "Want to start with how much total debt you'd like to consolidate?"
    );
  }

  if (
    lastUserMessage.includes("hello") ||
    lastUserMessage.includes("hi") ||
    lastUserMessage.includes("hey")
  ) {
    return (
      "Hello! Welcome to Cashew Capital. I'm Cashew Advisor, and I'm here to help you explore " +
      "loan options — no pressure, no paperwork.\n\n" +
      "I can help with:\n" +
      "• Pre-qualification for personal loans\n" +
      "• Debt consolidation planning\n" +
      "• Credit building strategies\n" +
      "• Repayment estimates\n\n" +
      "What brings you in today?"
    );
  }

  if (
    lastUserMessage.includes("rate") ||
    lastUserMessage.includes("apr") ||
    lastUserMessage.includes("interest")
  ) {
    return (
      "Here's a quick overview of our current rate ranges:\n\n" +
      "• Personal Loans: 6.99% – 24.99% APR\n" +
      "• Debt Consolidation: 5.99% – 22.99% APR\n" +
      "• Credit Building: 8.99% – 19.99% APR\n\n" +
      "Your exact rate depends on credit score, income, and loan amount. " +
      "Share those details and I can give you a personalized estimate!"
    );
  }

  return (
    "I'm here to help with all things lending! I can assist with:\n\n" +
    "• Loan pre-qualification — tell me your income and desired amount\n" +
    "• Repayment estimates — share a loan amount and I'll calculate payments\n" +
    "• Credit guidance — let me know your credit score range\n" +
    "• Debt consolidation — tell me about your current debts\n\n" +
    "What would you like to explore?"
  );
}
