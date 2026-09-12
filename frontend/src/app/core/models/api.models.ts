export interface Kpi {
  label: string;
  value: string;
  delta: string;
  deltaDir: 'up' | 'down';
  sub: string;
}

export interface VolumeTrendPoint {
  day: string;
  chat: number;
  email: number;
  voice: number;
  social: number;
}

export type ResolutionKey = 'ai' | 'hybrid' | 'human' | 'escalated';

export interface ResolutionSplitSlice {
  name: string;
  value: number;
  key: ResolutionKey;
}

export interface CsatTrendPoint {
  week: string;
  csat: number;
}

export interface TicketCategory {
  category: string;
  tickets: number;
}

export interface ResponseTimeBucket {
  bucket: string;
  pct: number;
}

export type ChannelKey = 'chat' | 'email' | 'voice' | 'social';

export interface ChannelMixSlice {
  name: string;
  value: number;
  key: ChannelKey;
}

export type AgentType = 'AI' | 'Human';
export type AgentStatus = 'active' | 'idle' | 'training';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  avatarColor: string;
  resolved: number;
  avgHandleTime: string;
  csat: number;
  autonomyRate: number | null;
  status: AgentStatus;
}

export type ConversationStatus = 'open' | 'pending' | 'resolved' | 'escalated';
export type Sentiment = 'positive' | 'neutral' | 'negative';
export type HandledBy = 'AI' | 'Human' | 'AI + Human';

export interface ConversationListItem {
  id: string;
  customer: string;
  email: string;
  avatarColor: string;
  channel: ChannelKey;
  subject: string;
  preview: string;
  status: ConversationStatus;
  sentiment: Sentiment;
  handledBy: HandledBy;
  agent: string;
  waitTime: string;
  updated: string;
  tags: string[];
}

export type MessageFrom = 'customer' | 'ai' | 'agent';

export interface ConversationMessage {
  id: string;
  from: MessageFrom;
  text: string;
  time: string;
}

export interface ConversationDetail extends ConversationListItem {
  aiSuggestion: string | null;
  aiConfidence: number | null;
  messages: ConversationMessage[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  hits: string;
}
