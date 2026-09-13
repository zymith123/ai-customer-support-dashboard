import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Agent,
  AutomationRule,
  ChannelMixSlice,
  ConversationDetail,
  ConversationListItem,
  ConversationMessage,
  CsatTrendPoint,
  Kpi,
  ResolutionSplitSlice,
  ResponseTimeBucket,
  Settings,
  TicketCategory,
  VolumeTrendPoint,
} from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = `${environment.apiBase}/api`;

  constructor(private http: HttpClient) {}

  getKpis(): Observable<Kpi[]> {
    return this.http.get<Kpi[]>(`${this.base}/kpis`);
  }

  getVolumeTrend(): Observable<VolumeTrendPoint[]> {
    return this.http.get<VolumeTrendPoint[]>(`${this.base}/volume-trend`);
  }

  getResolutionSplit(): Observable<ResolutionSplitSlice[]> {
    return this.http.get<ResolutionSplitSlice[]>(`${this.base}/resolution-split`);
  }

  getCsatTrend(): Observable<CsatTrendPoint[]> {
    return this.http.get<CsatTrendPoint[]>(`${this.base}/csat-trend`);
  }

  getTicketCategories(): Observable<TicketCategory[]> {
    return this.http.get<TicketCategory[]>(`${this.base}/ticket-categories`);
  }

  getResponseTimeDistribution(): Observable<ResponseTimeBucket[]> {
    return this.http.get<ResponseTimeBucket[]>(`${this.base}/response-time-distribution`);
  }

  getChannelMix(): Observable<ChannelMixSlice[]> {
    return this.http.get<ChannelMixSlice[]>(`${this.base}/channel-mix`);
  }

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.base}/agents`);
  }

  getConversations(): Observable<ConversationListItem[]> {
    return this.http.get<ConversationListItem[]>(`${this.base}/conversations`);
  }

  getConversation(id: string): Observable<ConversationDetail> {
    return this.http.get<ConversationDetail>(`${this.base}/conversations/${id}`);
  }

  getAutomationRules(): Observable<AutomationRule[]> {
    return this.http.get<AutomationRule[]>(`${this.base}/automation-rules`);
  }

  updateAutomationRule(id: string, enabled: boolean): Observable<AutomationRule> {
    return this.http.patch<AutomationRule>(`${this.base}/automation-rules/${id}`, { enabled });
  }

  postMessage(conversationId: string, text: string): Observable<ConversationMessage> {
    return this.http.post<ConversationMessage>(`${this.base}/conversations/${conversationId}/messages`, { text });
  }

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${this.base}/settings`);
  }

  updateSettings(settings: Settings): Observable<Settings> {
    return this.http.put<Settings>(`${this.base}/settings`, settings);
  }
}
