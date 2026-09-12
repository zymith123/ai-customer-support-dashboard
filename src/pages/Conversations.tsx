import { useState } from "react";
import clsx from "clsx";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Avatar, Card, ChannelIcon, Pill, SentimentTag, StatusBadge } from "../components/ui";
import { conversations, type Conversation } from "../data/mockData";

function MessageBubble({ msg }: { msg: Conversation["messages"][number] }) {
  const isCustomer = msg.from === "customer";
  return (
    <div className={clsx("flex gap-2.5", isCustomer ? "flex-row" : "flex-row-reverse")}>
      <span
        className={clsx(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white",
        )}
        style={{
          background: isCustomer
            ? "var(--color-ink-muted)"
            : msg.from === "ai"
              ? "var(--color-brand)"
              : "var(--color-series-3)",
        }}
      >
        {isCustomer ? <User size={13} /> : msg.from === "ai" ? <Bot size={13} /> : <User size={13} />}
      </span>
      <div className={clsx("max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm", isCustomer ? "rounded-tl-sm" : "rounded-tr-sm")}
        style={{
          background: isCustomer ? "var(--color-surface-sunken)" : "var(--color-brand-soft)",
          color: "var(--color-ink-primary)",
        }}
      >
        <p>{msg.text}</p>
        <p className="mt-1 text-[10px] text-ink-muted">{msg.time}</p>
      </div>
    </div>
  );
}

export default function Conversations() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const selected = conversations.find((c) => c.id === selectedId)!;

  return (
    <div className="grid h-[calc(100vh-140px)] grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
      <Card padded={false} className="flex flex-col overflow-hidden">
        <div className="border-b border-[var(--color-border)] p-4">
          <p className="text-sm font-semibold text-ink-primary">Inbox</p>
          <p className="text-xs text-ink-muted">{conversations.length} active conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={clsx(
                "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                c.id === selectedId ? "bg-[var(--color-brand-soft)]" : "hover:bg-[var(--color-surface-sunken)]",
              )}
            >
              <Avatar name={c.customer} color={c.avatarColor} size={34} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-ink-primary">{c.customer}</p>
                  <span className="shrink-0 text-[10px] text-ink-muted">{c.updated}</span>
                </div>
                <p className="truncate text-xs text-ink-secondary">{c.subject}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <ChannelIcon channel={c.channel} />
                  <StatusBadge status={c.status} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <div className="flex min-w-0 flex-col gap-4 lg:flex-row">
        <Card padded={false} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
            <div className="flex items-center gap-3">
              <Avatar name={selected.customer} color={selected.avatarColor} size={40} />
              <div>
                <p className="text-sm font-semibold text-ink-primary">{selected.customer}</p>
                <p className="text-xs text-ink-muted">{selected.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SentimentTag sentiment={selected.sentiment} />
              <StatusBadge status={selected.status} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5">
            {selected.tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
            <span className="ml-auto text-xs text-ink-muted">
              Handled by <span className="font-medium text-ink-secondary">{selected.agent}</span>
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {selected.messages.map((m) => (
              <MessageBubble key={m.id} msg={m} />
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-[var(--color-border)] p-3">
            <input
              type="text"
              placeholder="Type a reply…"
              className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)] px-3.5 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-[var(--color-brand)] focus:outline-none"
            />
            <button className="flex items-center gap-1.5 rounded-xl bg-[var(--color-brand)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <Send size={15} /> Send
            </button>
          </div>
        </Card>

        {selected.aiSuggestion && (
          <Card className="w-full shrink-0 lg:w-80">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                <Sparkles size={15} />
              </span>
              <p className="text-sm font-semibold text-ink-primary">AI suggested reply</p>
            </div>
            <p className="rounded-xl bg-[var(--color-surface-sunken)] p-3 text-sm leading-relaxed text-ink-secondary">
              {selected.aiSuggestion}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-ink-muted">Confidence</span>
              <span className="font-semibold tabular-nums text-ink-primary">{selected.aiConfidence}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-sunken)]">
              <div
                className="h-full rounded-full"
                style={{ width: `${selected.aiConfidence}%`, background: "var(--color-brand)" }}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg bg-[var(--color-brand)] py-2 text-xs font-medium text-white hover:opacity-90">
                Use this reply
              </button>
              <button className="flex-1 rounded-lg border border-[var(--color-border)] py-2 text-xs font-medium text-ink-secondary hover:bg-[var(--color-surface-sunken)]">
                Edit
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
