import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { Card, CardHeader } from "../components/ui";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-[var(--color-brand)]" : "bg-[var(--color-surface-sunken)] border border-[var(--color-border)]",
      )}
      aria-pressed={checked}
    >
      <span
        className={clsx(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function SettingRow({
  label,
  description,
  control,
}: {
  label: string;
  description: string;
  control: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-sm font-medium text-ink-primary">{label}</p>
        <p className="text-xs text-ink-muted">{description}</p>
      </div>
      {control}
    </div>
  );
}

export default function Settings() {
  const [autoResolve, setAutoResolve] = useState(true);
  const [proactiveOffers, setProactiveOffers] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [escalateNegative, setEscalateNegative] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [tone, setTone] = useState("friendly");
  const [confidence, setConfidence] = useState(85);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card>
        <CardHeader title="AI behavior" subtitle="Control how your AI agents respond to customers" />
        <div className="divide-y divide-[var(--color-border)]">
          <SettingRow
            label="Auto-resolve simple requests"
            description="Password resets, order status, FAQs handled end-to-end"
            control={<Toggle checked={autoResolve} onChange={setAutoResolve} />}
          />
          <SettingRow
            label="Proactive retention offers"
            description="Suggest discounts before confirming a cancellation"
            control={<Toggle checked={proactiveOffers} onChange={setProactiveOffers} />}
          />
          <SettingRow
            label="Auto-translate conversations"
            description="Detect language and respond in the customer's language"
            control={<Toggle checked={autoTranslate} onChange={setAutoTranslate} />}
          />
          <SettingRow
            label="Escalate on negative sentiment"
            description="Route frustrated customers to a senior human agent"
            control={<Toggle checked={escalateNegative} onChange={setEscalateNegative} />}
          />
        </div>

        <div className="mt-2 border-t border-[var(--color-border)] pt-4">
          <p className="mb-2 text-sm font-medium text-ink-primary">Response tone</p>
          <div className="flex flex-wrap gap-2">
            {["friendly", "professional", "concise", "empathetic"].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={clsx(
                  "rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  tone === t
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-[var(--color-surface-sunken)] text-ink-secondary hover:bg-[var(--color-border)]",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 border-t border-[var(--color-border)] pt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-ink-primary">Minimum confidence to auto-send</p>
            <span className="text-sm font-semibold tabular-nums text-[var(--color-brand)]">{confidence}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={100}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full accent-[var(--color-brand)]"
          />
          <p className="mt-1.5 text-xs text-ink-muted">
            Replies below this confidence are queued for human review instead of auto-sent.
          </p>
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader title="Notifications" subtitle="Choose how your team is alerted" />
          <div className="divide-y divide-[var(--color-border)]">
            <SettingRow
              label="Daily email digest"
              description="Summary of volume, CSAT and escalations at 8am"
              control={<Toggle checked={emailDigest} onChange={setEmailDigest} />}
            />
            <SettingRow
              label="Slack alerts for escalations"
              description="Post to #support-escalations when a ticket is escalated"
              control={<Toggle checked={slackAlerts} onChange={setSlackAlerts} />}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Workspace" subtitle="Team and account details" />
          <div className="flex flex-col gap-3">
            <label className="text-xs font-medium text-ink-secondary">
              Workspace name
              <input
                defaultValue="Aria Support"
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-sunken)] px-3 py-2 text-sm text-ink-primary focus:border-[var(--color-brand)] focus:outline-none"
              />
            </label>
            <label className="text-xs font-medium text-ink-secondary">
              Support email
              <input
                defaultValue="support@ariahq.com"
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-sunken)] px-3 py-2 text-sm text-ink-primary focus:border-[var(--color-brand)] focus:outline-none"
              />
            </label>
            <button className="mt-2 self-start rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              Save changes
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
