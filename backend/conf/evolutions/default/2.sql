# --- !Ups

CREATE TABLE settings (
  id INT PRIMARY KEY DEFAULT 1,
  auto_resolve BOOLEAN NOT NULL,
  proactive_offers BOOLEAN NOT NULL,
  auto_translate BOOLEAN NOT NULL,
  escalate_negative BOOLEAN NOT NULL,
  tone VARCHAR(20) NOT NULL,
  confidence_threshold INT NOT NULL,
  email_digest BOOLEAN NOT NULL,
  slack_alerts BOOLEAN NOT NULL,
  workspace_name VARCHAR(150) NOT NULL,
  support_email VARCHAR(150) NOT NULL,
  CHECK (id = 1)
);

INSERT INTO settings
  (id, auto_resolve, proactive_offers, auto_translate, escalate_negative, tone,
   confidence_threshold, email_digest, slack_alerts, workspace_name, support_email)
VALUES
  (1, true, false, true, true, 'friendly', 80, true, false, 'Meridian & Co.', 'support@meridianco.com');

# --- !Downs

DROP TABLE IF EXISTS settings;
