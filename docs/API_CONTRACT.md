# API Contract — Aria Support Dashboard

Backend: Play Framework (Scala) + PostgreSQL, base URL `http://localhost:9000`.
Frontend: Angular, dev server `http://localhost:4200`, proxied to the backend
(or calling it directly with CORS enabled for that origin).

All endpoints are `GET`, unprefixed by anything but `/api`, and return JSON.
Field names are `camelCase` to match what the Angular models expect.

## GET /api/kpis
```json
[
  { "label": "Conversations Today", "value": "2,847", "delta": "+12.4%", "deltaDir": "up", "sub": "vs. yesterday" }
]
```
`deltaDir` is `"up"` or `"down"`.

## GET /api/volume-trend
Last 7 days of conversation volume by channel.
```json
[
  { "day": "Mon", "chat": 420, "email": 210, "voice": 90, "social": 60 }
]
```

## GET /api/resolution-split
```json
[
  { "name": "Resolved by AI", "value": 4820, "key": "ai" },
  { "name": "AI + Human", "value": 1120, "key": "hybrid" },
  { "name": "Human only", "value": 640, "key": "human" },
  { "name": "Escalated", "value": 210, "key": "escalated" }
]
```

## GET /api/csat-trend
```json
[{ "week": "W1", "csat": 4.58 }]
```

## GET /api/ticket-categories
```json
[{ "category": "Billing", "tickets": 1240 }]
```

## GET /api/response-time-distribution
```json
[{ "bucket": "<10s", "pct": 52 }]
```

## GET /api/channel-mix
```json
[{ "name": "Chat", "value": 3419, "key": "chat" }]
```
`key` is one of `chat | email | voice | social`.

## GET /api/agents
```json
[
  {
    "id": "ai-nova",
    "name": "Nova (AI Agent)",
    "type": "AI",
    "avatarColor": "#2a78d6",
    "resolved": 3120,
    "avgHandleTime": "42s",
    "csat": 4.81,
    "autonomyRate": 91,
    "status": "active"
  }
]
```
`type` is `"AI" | "Human"`. `status` is `"active" | "idle" | "training"`.
`autonomyRate` is nullable (human agents omit it / return `null`).
`avatarColor` is a plain hex string (the frontend maps AI/human identity to
its own themed swatch — see the categorical palette in the frontend brief).

## GET /api/conversations
List view — no messages, kept light for the inbox.
```json
[
  {
    "id": "c-1042",
    "customer": "Ethan Wallace",
    "email": "ethan.wallace@meridianco.com",
    "avatarColor": "#2a78d6",
    "channel": "chat",
    "subject": "Refund not showing on statement",
    "preview": "I was told the refund would post within 3 days but it's been a week...",
    "status": "open",
    "sentiment": "negative",
    "handledBy": "AI",
    "agent": "Nova (AI Agent)",
    "waitTime": "12s",
    "updated": "2m ago",
    "tags": ["billing", "refund"]
  }
]
```
`channel`: `chat | email | voice | social`.
`status`: `open | pending | resolved | escalated`.
`sentiment`: `positive | neutral | negative`.
`handledBy`: `AI | Human | AI + Human`.

## GET /api/conversations/:id
Same fields as the list item, plus:
```json
{
  "...": "...",
  "aiSuggestion": "I can see your refund of $128.40 was issued on Sep 5 ...",
  "aiConfidence": 94,
  "messages": [
    { "id": "m1", "from": "customer", "text": "Hi, I was told ...", "time": "10:02 AM" }
  ]
}
```
`from`: `customer | ai | agent`. `aiSuggestion`/`aiConfidence` may be `null`
when no AI reply was generated (e.g. a fully human-handled conversation).
Returns `404` with `{ "error": "not_found" }` for an unknown id.

## GET /api/automation-rules
```json
[
  {
    "id": "r1",
    "name": "Auto-resolve password reset requests",
    "trigger": "Intent: password_reset",
    "action": "Send reset link, close ticket",
    "enabled": true,
    "hits": "1,204 / week"
  }
]
```

## CORS
The backend must allow `http://localhost:4200` (Angular dev server) for all
`/api/*` routes, methods `GET, OPTIONS`, no credentials required.

## Seed data
The backend should seed the database (via Play Evolutions SQL) with data
equivalent in shape and volume to the original mock dataset: 4 KPI tiles, a
7-day volume trend, a 4-way resolution split, a 6-week CSAT trend, 6 ticket
categories, a 5-bucket response time distribution, a 4-channel mix, 6 agents
(3 AI + 3 human) and 6 conversations (each with 3-4 messages), and 4
automation rules. Exact copy shown in the frontend brief / original mockData.
