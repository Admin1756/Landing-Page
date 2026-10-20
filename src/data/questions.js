/* =====================================================================
   FINANCIAL FREEDOM QUESTIONS - edit this array, nothing else needed.

   Every question is a multiple-choice question. Set allowOther: true to add
   an "Other" option that reveals a fill-in box.

   Fields
     id           unique key (no spaces)
     column       header used in the Google Sheet for this answer
     text         the question shown to the person
     hint         optional small helper text
     options      [{ label, value?, risk? }]
                    value - number used by the plan calculator (roles below)
                    risk  - 0 (cautious) to 3 (comfortable with risk), only if scored: true
     allowOther   true => adds "Other" with a text box
     otherLabel   placeholder shown in the text box
     otherType    "number" (parsed and used as value) or "text" (default)
     otherRisk    risk points if they pick Other on a scored question (default 1)
     scored       true => counts toward the risk score
     weight       how much the question counts in the risk score (default 1)
     role         links the answer to the calculator. One of:
                    "monthlyExpenses"    monthly living cost today, in rupees
                    "freedomAge"         age at which they want financial freedom
                    "currentInvestments" money already invested, in rupees
                    "monthlyInvestable"  what they can invest every month, in rupees
   Age is collected in the header form.
   Add, remove or reorder questions freely. The Google Sheet adds new columns by itself.
   ===================================================================== */

export const QUESTIONS = [
  {
    id: "monthlyExpenses",
    column: "Monthly expenses",
    role: "monthlyExpenses",
    text: "What does your household spend in a typical month?",
    hint: "Rent or EMI, food, school fees, bills, everything.",
    options: [
      { label: "Under ₹25,000", value: 20000 },
      { label: "₹25,000 – ₹50,000", value: 37500 },
      { label: "₹50,000 – ₹1 lakh", value: 75000 },
      { label: "₹1 lakh – ₹2 lakh", value: 150000 },
      { label: "Above ₹2 lakh", value: 250000 },
    ],
    allowOther: true,
    otherType: "number",
    otherLabel: "Monthly spend in ₹ (numbers only)",
  },
  {
    id: "freedomAge",
    column: "Target freedom age",
    role: "freedomAge",
    text: "By what age do you want to stop depending on a salary or business income?",
    options: [
      { label: "By 45", value: 45 },
      { label: "By 50", value: 50 },
      { label: "By 55", value: 55 },
      { label: "By 60", value: 60 },
      { label: "By 65", value: 65 },
    ],
    allowOther: true,
    otherType: "number",
    otherLabel: "Your target age (numbers only)",
  },
  {
    id: "currentInvestments",
    column: "Invested today",
    role: "currentInvestments",
    text: "How much have you already invested, excluding your own home?",
    hint: "Stocks, funds, gold, rental property, business stake.",
    options: [
      { label: "Nothing yet", value: 0 },
      { label: "Under ₹5 lakh", value: 250000 },
      { label: "₹5 lakh – ₹15 lakh", value: 1000000 },
      { label: "₹15 lakh – ₹50 lakh", value: 3250000 },
      { label: "₹50 lakh – ₹1 crore", value: 7500000 },
      { label: "Above ₹1 crore", value: 15000000 },
    ],
    allowOther: true,
    otherType: "number",
    otherLabel: "Amount in ₹ (numbers only)",
  },
  {
    id: "monthlyInvestable",
    column: "Can invest per month",
    role: "monthlyInvestable",
    text: "How much could you set aside to invest every month?",
    options: [
      { label: "Under ₹10,000", value: 7500 },
      { label: "₹10,000 – ₹25,000", value: 17500 },
      { label: "₹25,000 – ₹50,000", value: 37500 },
      { label: "₹50,000 – ₹1 lakh", value: 75000 },
      { label: "Above ₹1 lakh", value: 125000 },
    ],
    allowOther: true,
    otherType: "number",
    otherLabel: "Monthly amount in ₹ (numbers only)",
  },
  {
    id: "whereMoney",
    column: "Where money sits today",
    text: "Where is most of your money today?",
    options: [
      { label: "Bank savings or fixed deposits" },
      { label: "Gold or silver" },
      { label: "Property" },
      { label: "Stocks or mutual funds" },
      { label: "My own business" },
    ],
    allowOther: true,
    otherLabel: "Tell us where",
  },
  {
    id: "experience",
    column: "Investing experience",
    text: "How would you describe your investing experience?",
    scored: true,
    options: [
      { label: "I have never invested", risk: 0 },
      { label: "Only gold, property or deposits", risk: 1 },
      { label: "Stocks or funds for under 3 years", risk: 2 },
      { label: "Stocks or funds for 3+ years", risk: 3 },
    ],
  },
  {
    id: "marketFall",
    column: "Reaction to a 20% fall",
    text: "Your portfolio falls 20% in three months. What do you do?",
    hint: "Be honest. There is no right answer.",
    scored: true,
    weight: 2,
    options: [
      { label: "Sell everything to stop the loss", risk: 0 },
      { label: "Sell some and wait", risk: 1 },
      { label: "Do nothing and wait for recovery", risk: 2 },
      { label: "Invest more while prices are low", risk: 3 },
    ],
  },
  {
    id: "incomeStability",
    column: "Income stability",
    text: "How steady is your income?",
    scored: true,
    options: [
      { label: "Irregular, varies a lot month to month", risk: 0 },
      { label: "Mostly steady, some ups and downs", risk: 1 },
      { label: "Steady salary or business income", risk: 2 },
      { label: "Very secure, with more than one source", risk: 3 },
    ],
    allowOther: true,
    otherLabel: "Describe your income",
    otherRisk: 1,
  },
  {
    id: "dependents",
    column: "Dependents",
    text: "How many people depend on your income?",
    scored: true,
    options: [
      { label: "Three or more", risk: 0 },
      { label: "One or two", risk: 1 },
      { label: "Only me and my spouse", risk: 2 },
      { label: "Only me", risk: 3 },
    ],
  },
  {
    id: "emergencyFund",
    column: "Emergency fund",
    text: "How many months of expenses do you keep aside, outside of investments?",
    scored: true,
    options: [
      { label: "Less than 3 months", risk: 0 },
      { label: "3 to 6 months", risk: 2 },
      { label: "More than 6 months", risk: 3 },
    ],
  },
  {
    id: "loans",
    column: "Interest-bearing loans",
    text: "Do you currently pay interest on any loans or credit cards?",
    options: [
      { label: "No loans" },
      { label: "Yes, a home loan" },
      { label: "Yes, a car or personal loan" },
      { label: "Yes, credit card dues" },
    ],
    allowOther: true,
    otherLabel: "Tell us about it",
  },
  {
    id: "callTime",
    column: "Best time to call",
    text: "When is the best time for our team to call you?",
    options: [
      { label: "Morning (9 am – 12 pm)" },
      { label: "Afternoon (12 pm – 4 pm)" },
      { label: "Evening (4 pm – 8 pm)" },
    ],
    allowOther: true,
    otherLabel: "Preferred time or day",
  },
];
