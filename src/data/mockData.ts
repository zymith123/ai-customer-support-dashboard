export type Channel = "chat" | "email" | "voice" | "social";
export type ConvoStatus = "open" | "pending" | "resolved" | "escalated";
export type Sentiment = "positive" | "neutral" | "negative";

export interface Message {
  id: string;
  from: "customer" | "ai" | "agent";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  customer: string;
  email: string;
  avatarColor: string;
  channel: Channel;
  subject: string;
  preview: string;
  status: ConvoStatus;
  sentiment: Sentiment;
  handledBy: "AI" | "Human" | "AI + Human";
  agent: string;
  waitTime: string;
  updated: string;
  tags: string[];
  messages: Message[];
  aiSuggestion?: string;
  aiConfidence?: number;
}

export interface AgentPerf {
  id: string;
  name: string;
  type: "AI" | "Human";
  avatarColor: string;
  resolved: number;
  avgHandleTime: string;
  csat: number;
  autonomyRate?: number;
  status: "active" | "idle" | "training";
}

export const kpis = [
  {
    label: "Conversations Today",
    value: "2,847",
    delta: "+12.4%",
    deltaDir: "up" as const,
    sub: "vs. yesterday",
  },
  {
    label: "Resolved by AI",
    value: "78.3%",
    delta: "+4.1%",
    deltaDir: "up" as const,
    sub: "no human handoff",
  },
  {
    label: "Avg First Response",
    value: "8s",
    delta: "-32%",
    deltaDir: "up" as const,
    sub: "AI-first routing",
  },
  {
    label: "CSAT Score",
    value: "4.72",
    delta: "-0.06",
    deltaDir: "down" as const,
    sub: "out of 5.0",
  },
];

export const volumeTrend = [
  { day: "Mon", chat: 420, email: 210, voice: 90, social: 60 },
  { day: "Tue", chat: 460, email: 198, voice: 102, social: 71 },
  { day: "Wed", chat: 512, email: 240, voice: 96, social: 84 },
  { day: "Thu", chat: 489, email: 223, voice: 110, social: 77 },
  { day: "Fri", chat: 540, email: 260, voice: 120, social: 92 },
  { day: "Sat", chat: 610, email: 190, voice: 70, social: 105 },
  { day: "Sun", chat: 588, email: 175, voice: 64, social: 98 },
];

export const resolutionSplit = [
  { name: "Resolved by AI", value: 4820, key: "ai" },
  { name: "AI + Human", value: 1120, key: "hybrid" },
  { name: "Human only", value: 640, key: "human" },
  { name: "Escalated", value: 210, key: "escalated" },
];

export const csatTrend = [
  { week: "W1", csat: 4.58 },
  { week: "W2", csat: 4.61 },
  { week: "W3", csat: 4.65 },
  { week: "W4", csat: 4.7 },
  { week: "W5", csat: 4.68 },
  { week: "W6", csat: 4.72 },
];

export const ticketCategories = [
  { category: "Billing", tickets: 1240 },
  { category: "Technical Issue", tickets: 980 },
  { category: "Account Access", tickets: 760 },
  { category: "Shipping", tickets: 640 },
  { category: "Returns", tickets: 520 },
  { category: "Feature Request", tickets: 310 },
];

export const responseTimeDistribution = [
  { bucket: "<10s", pct: 52 },
  { bucket: "10-30s", pct: 24 },
  { bucket: "30s-2m", pct: 14 },
  { bucket: "2-10m", pct: 7 },
  { bucket: ">10m", pct: 3 },
];

export const channelMix = [
  { name: "Chat", value: 3419, key: "chat" },
  { name: "Email", value: 1496, key: "email" },
  { name: "Voice", value: 652, key: "voice" },
  { name: "Social", value: 587, key: "social" },
];

export const agents: AgentPerf[] = [
  {
    id: "ai-nova",
    name: "Nova (AI Agent)",
    type: "AI",
    avatarColor: "var(--color-series-1)",
    resolved: 3120,
    avgHandleTime: "42s",
    csat: 4.81,
    autonomyRate: 91,
    status: "active",
  },
  {
    id: "ai-atlas",
    name: "Atlas (AI Agent)",
    type: "AI",
    avatarColor: "var(--color-series-7)",
    resolved: 1890,
    avgHandleTime: "58s",
    csat: 4.69,
    autonomyRate: 84,
    status: "active",
  },
  {
    id: "h-maria",
    name: "Maria Chen",
    type: "Human",
    avatarColor: "var(--color-series-3)",
    resolved: 412,
    avgHandleTime: "6m 12s",
    csat: 4.9,
    status: "active",
  },
  {
    id: "h-devon",
    name: "Devon Brooks",
    type: "Human",
    avatarColor: "var(--color-series-4)",
    resolved: 356,
    avgHandleTime: "7m 40s",
    csat: 4.77,
    status: "active",
  },
  {
    id: "ai-scout",
    name: "Scout (AI Agent)",
    type: "AI",
    avatarColor: "var(--color-series-5)",
    resolved: 980,
    avgHandleTime: "35s",
    csat: 4.55,
    autonomyRate: 88,
    status: "training",
  },
  {
    id: "h-priya",
    name: "Priya Patel",
    type: "Human",
    avatarColor: "var(--color-series-8)",
    resolved: 298,
    avgHandleTime: "5m 55s",
    csat: 4.84,
    status: "idle",
  },
];

export const conversations: Conversation[] = [
  {
    id: "c-1042",
    customer: "Ethan Wallace",
    email: "ethan.wallace@meridianco.com",
    avatarColor: "var(--color-series-1)",
    channel: "chat",
    subject: "Refund not showing on statement",
    preview: "I was told the refund would post within 3 days but it's been a week...",
    status: "open",
    sentiment: "negative",
    handledBy: "AI",
    agent: "Nova (AI Agent)",
    waitTime: "12s",
    updated: "2m ago",
    tags: ["billing", "refund"],
    aiSuggestion:
      "I can see your refund of $128.40 was issued on Sep 5 and should post by Sep 9. I've escalated to our payments team for a manual trace since it's past the window — you'll get an update within 24 hours.",
    aiConfidence: 94,
    messages: [
      { id: "m1", from: "customer", text: "Hi, I was told my refund would show up within 3 business days but it still hasn't.", time: "10:02 AM" },
      { id: "m2", from: "ai", text: "I'm sorry for the delay, Ethan. Let me pull up your order right away.", time: "10:02 AM" },
      { id: "m3", from: "customer", text: "Order #48213, refund requested last Tuesday.", time: "10:03 AM" },
      { id: "m4", from: "ai", text: "Thanks — I can see the refund of $128.40 was issued on Sep 5. Give me one moment to check with payments.", time: "10:04 AM" },
    ],
  },
  {
    id: "c-1041",
    customer: "Priya Nair",
    email: "priya.nair@lumen.io",
    avatarColor: "var(--color-series-3)",
    channel: "email",
    subject: "API key not activating on new project",
    preview: "Generated a new key for the staging project and getting 401 on every call.",
    status: "pending",
    sentiment: "neutral",
    handledBy: "AI + Human",
    agent: "Atlas (AI Agent) → Maria Chen",
    waitTime: "3m",
    updated: "8m ago",
    tags: ["api", "technical"],
    aiSuggestion:
      "Your key was scoped to the production environment by default. I've regenerated it with staging scope — it should propagate within 60 seconds. Looping in Maria to confirm your webhook config still matches.",
    aiConfidence: 87,
    messages: [
      { id: "m1", from: "customer", text: "New API key for staging keeps returning 401.", time: "9:14 AM" },
      { id: "m2", from: "ai", text: "Thanks for flagging this — checking the key scope now.", time: "9:15 AM" },
      { id: "m3", from: "ai", text: "Found it: the key was scoped to production. Regenerating with staging scope.", time: "9:17 AM" },
      { id: "m4", from: "agent", text: "Hi Priya, Maria here — I'll double check your webhook config once the new key is live.", time: "9:25 AM" },
    ],
  },
  {
    id: "c-1040",
    customer: "Jorge Alvarez",
    email: "jorge.a@brightpath.org",
    avatarColor: "var(--color-series-4)",
    channel: "voice",
    subject: "Cancel subscription — moving to competitor",
    preview: "Call transcript: customer requesting immediate cancellation and pro-rated refund.",
    status: "escalated",
    sentiment: "negative",
    handledBy: "Human",
    agent: "Devon Brooks",
    waitTime: "45s",
    updated: "14m ago",
    tags: ["retention", "cancellation"],
    messages: [
      { id: "m1", from: "customer", text: "I want to cancel my plan today, this isn't working for our team.", time: "8:40 AM" },
      { id: "m2", from: "agent", text: "I understand, Jorge. Before I process that, can I ask what's not working so I can see if there's a fix?", time: "8:41 AM" },
      { id: "m3", from: "customer", text: "Support response times, mainly. We've had three delays this month.", time: "8:42 AM" },
    ],
  },
  {
    id: "c-1039",
    customer: "Aisha Rahman",
    email: "aisha.r@northgate.com",
    avatarColor: "var(--color-series-5)",
    channel: "social",
    subject: "Shipping delay complaint on X/Twitter",
    preview: "Public post tagging @brand about a delayed package, needs quick response.",
    status: "resolved",
    sentiment: "negative",
    handledBy: "AI",
    agent: "Scout (AI Agent)",
    waitTime: "6s",
    updated: "22m ago",
    tags: ["shipping", "social"],
    aiSuggestion:
      "Hi Aisha, so sorry about the delay! Your package (order #58821) is out for delivery and should arrive by 6 PM today. I've added a $15 credit to your account for the inconvenience.",
    aiConfidence: 96,
    messages: [
      { id: "m1", from: "customer", text: "@brand my order is a week late and nobody has replied to my emails", time: "7:55 AM" },
      { id: "m2", from: "ai", text: "So sorry, Aisha! Checking your order now — can you confirm the order number via DM?", time: "7:56 AM" },
      { id: "m3", from: "customer", text: "#58821", time: "7:58 AM" },
      { id: "m4", from: "ai", text: "It's out for delivery, arriving by 6 PM today. Added a $15 credit for the trouble!", time: "7:59 AM" },
    ],
  },
  {
    id: "c-1038",
    customer: "Liam Fitzgerald",
    email: "liam.f@vantage.dev",
    avatarColor: "var(--color-series-7)",
    channel: "chat",
    subject: "How do I export my analytics data?",
    preview: "Looking for a CSV export option for the last 90 days of usage data.",
    status: "resolved",
    sentiment: "positive",
    handledBy: "AI",
    agent: "Nova (AI Agent)",
    waitTime: "4s",
    updated: "31m ago",
    tags: ["how-to", "analytics"],
    aiSuggestion:
      "You can export CSV from Analytics → Export → select a date range up to 90 days → Export CSV. I've also emailed you a direct link to your last report.",
    aiConfidence: 98,
    messages: [
      { id: "m1", from: "customer", text: "Is there a way to export my usage analytics as CSV?", time: "7:30 AM" },
      { id: "m2", from: "ai", text: "Yes! Go to Analytics → Export, choose your date range (up to 90 days), then Export CSV.", time: "7:30 AM" },
      { id: "m3", from: "customer", text: "Perfect, found it. Thank you!", time: "7:32 AM" },
    ],
  },
  {
    id: "c-1037",
    customer: "Sofia Mendes",
    email: "sofia.mendes@corelabs.ai",
    avatarColor: "var(--color-series-8)",
    channel: "email",
    subject: "Duplicate charge on invoice #7734",
    preview: "Billed twice for the enterprise plan this month, requesting one charge reversed.",
    status: "open",
    sentiment: "negative",
    handledBy: "AI + Human",
    agent: "Atlas (AI Agent) → Priya Patel",
    waitTime: "1m",
    updated: "40m ago",
    tags: ["billing", "duplicate-charge"],
    aiSuggestion:
      "I confirmed two charges of $499 posted on Sep 9 for invoice #7734. I've flagged the duplicate for reversal and assigned Priya to process it — expect the refund within 2 business days.",
    aiConfidence: 90,
    messages: [
      { id: "m1", from: "customer", text: "I was charged twice for the enterprise plan this billing cycle.", time: "7:05 AM" },
      { id: "m2", from: "ai", text: "Let me check invoice #7734 — one moment.", time: "7:06 AM" },
      { id: "m3", from: "ai", text: "Confirmed, two $499 charges on Sep 9. Flagging for reversal and looping in billing.", time: "7:08 AM" },
    ],
  },
];

export const automationRules = [
  {
    id: "r1",
    name: "Auto-resolve password reset requests",
    trigger: "Intent: password_reset",
    action: "Send reset link, close ticket",
    enabled: true,
    hits: "1,204 / week",
  },
  {
    id: "r2",
    name: "Escalate negative sentiment + billing",
    trigger: "Sentiment: negative AND Category: billing",
    action: "Route to senior human agent",
    enabled: true,
    hits: "88 / week",
  },
  {
    id: "r3",
    name: "Offer proactive discount on cancellation intent",
    trigger: "Intent: cancel_subscription",
    action: "Suggest retention offer before confirming",
    enabled: true,
    hits: "156 / week",
  },
  {
    id: "r4",
    name: "Auto-translate non-English chats",
    trigger: "Detected language != en",
    action: "Translate + respond in customer language",
    enabled: false,
    hits: "0 / week",
  },
];
