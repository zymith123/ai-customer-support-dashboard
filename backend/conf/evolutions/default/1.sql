# --- Aria Support Dashboard schema + seed data

# --- !Ups

CREATE TABLE kpis (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  value VARCHAR(50) NOT NULL,
  delta VARCHAR(20) NOT NULL,
  delta_dir VARCHAR(10) NOT NULL,
  sub VARCHAR(100) NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE volume_trend (
  id SERIAL PRIMARY KEY,
  day VARCHAR(10) NOT NULL,
  chat INT NOT NULL,
  email INT NOT NULL,
  voice INT NOT NULL,
  social INT NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE resolution_split (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  value INT NOT NULL,
  key VARCHAR(20) NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE csat_trend (
  id SERIAL PRIMARY KEY,
  week VARCHAR(10) NOT NULL,
  csat DOUBLE PRECISION NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE ticket_categories (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  tickets INT NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE response_time_distribution (
  id SERIAL PRIMARY KEY,
  bucket VARCHAR(20) NOT NULL,
  pct INT NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE channel_mix (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  value INT NOT NULL,
  key VARCHAR(20) NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE agents (
  id VARCHAR(30) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(10) NOT NULL,
  avatar_color VARCHAR(10) NOT NULL,
  resolved INT NOT NULL,
  avg_handle_time VARCHAR(20) NOT NULL,
  csat DOUBLE PRECISION NOT NULL,
  autonomy_rate INT,
  status VARCHAR(20) NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE conversations (
  id VARCHAR(20) PRIMARY KEY,
  customer VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  avatar_color VARCHAR(10) NOT NULL,
  channel VARCHAR(10) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  preview VARCHAR(500) NOT NULL,
  status VARCHAR(20) NOT NULL,
  sentiment VARCHAR(10) NOT NULL,
  handled_by VARCHAR(20) NOT NULL,
  agent VARCHAR(100) NOT NULL,
  wait_time VARCHAR(20) NOT NULL,
  updated VARCHAR(20) NOT NULL,
  tags VARCHAR(300) NOT NULL,
  ai_suggestion VARCHAR(500),
  ai_confidence INT,
  sort_order INT NOT NULL
);

CREATE TABLE messages (
  id VARCHAR(20) PRIMARY KEY,
  conversation_id VARCHAR(20) NOT NULL REFERENCES conversations(id),
  sender VARCHAR(10) NOT NULL,
  "text" VARCHAR(1000) NOT NULL,
  "time" VARCHAR(20) NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE automation_rules (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  "trigger" VARCHAR(200) NOT NULL,
  "action" VARCHAR(200) NOT NULL,
  enabled BOOLEAN NOT NULL,
  hits VARCHAR(30) NOT NULL,
  sort_order INT NOT NULL
);

-- KPIs
INSERT INTO kpis (label, value, delta, delta_dir, sub, sort_order) VALUES
('Conversations Today', '2,847', '+12.4%', 'up', 'vs. yesterday', 1),
('Avg Resolution Time', '3m 42s', '-8.1%', 'down', 'vs. yesterday', 2),
('CSAT Score', '4.72', '+0.3%', 'up', 'vs. last week', 3),
('AI Autonomy Rate', '87%', '+4.2%', 'up', 'vs. last month', 4);

-- Volume trend (7 days)
INSERT INTO volume_trend (day, chat, email, voice, social, sort_order) VALUES
('Mon', 420, 210, 90, 60, 1),
('Tue', 460, 195, 85, 72, 2),
('Wed', 510, 230, 100, 65, 3),
('Thu', 480, 205, 95, 80, 4),
('Fri', 530, 240, 110, 90, 5),
('Sat', 300, 140, 60, 50, 6),
('Sun', 260, 120, 50, 40, 7);

-- Resolution split
INSERT INTO resolution_split (name, value, key, sort_order) VALUES
('Resolved by AI', 4820, 'ai', 1),
('AI + Human', 1120, 'hybrid', 2),
('Human only', 640, 'human', 3),
('Escalated', 210, 'escalated', 4);

-- CSAT trend (6 weeks)
INSERT INTO csat_trend (week, csat, sort_order) VALUES
('W1', 4.58, 1),
('W2', 4.61, 2),
('W3', 4.65, 3),
('W4', 4.70, 4),
('W5', 4.68, 5),
('W6', 4.74, 6);

-- Ticket categories
INSERT INTO ticket_categories (category, tickets, sort_order) VALUES
('Billing', 1240, 1),
('Account Access', 980, 2),
('Technical Issue', 860, 3),
('Shipping & Delivery', 640, 4),
('Product Question', 520, 5),
('Feature Request', 310, 6);

-- Response time distribution
INSERT INTO response_time_distribution (bucket, pct, sort_order) VALUES
('<10s', 52, 1),
('10-30s', 28, 2),
('30-60s', 12, 3),
('1-5m', 6, 4),
('>5m', 2, 5);

-- Channel mix
INSERT INTO channel_mix (name, value, key, sort_order) VALUES
('Chat', 3419, 'chat', 1),
('Email', 1875, 'email', 2),
('Voice', 842, 'voice', 3),
('Social', 611, 'social', 4);

-- Agents (3 AI + 3 human)
INSERT INTO agents (id, name, type, avatar_color, resolved, avg_handle_time, csat, autonomy_rate, status, sort_order) VALUES
('ai-nova', 'Nova (AI Agent)', 'AI', '#2a78d6', 3120, '42s', 4.81, 91, 'active', 1),
('ai-atlas', 'Atlas (AI Agent)', 'AI', '#eb6834', 2840, '38s', 4.74, 88, 'active', 2),
('ai-scout', 'Scout (AI Agent)', 'AI', '#1baf7a', 1590, '51s', 4.62, 79, 'training', 3),
('h-maria', 'Maria Chen', 'Human', '#eda100', 860, '6m 20s', 4.90, NULL, 'active', 4),
('h-devon', 'Devon Brooks', 'Human', '#e87ba4', 640, '8m 05s', 4.77, NULL, 'idle', 5),
('h-priya', 'Priya Anand', 'Human', '#008300', 705, '7m 40s', 4.85, NULL, 'active', 6);

-- Conversations
INSERT INTO conversations (id, customer, email, avatar_color, channel, subject, preview, status, sentiment, handled_by, agent, wait_time, updated, tags, ai_suggestion, ai_confidence, sort_order) VALUES
('c-1042', 'Ethan Wallace', 'ethan.wallace@meridianco.com', '#2a78d6', 'chat', 'Refund not showing on statement', 'I was told the refund would post within 3 days but it''s been a week...', 'open', 'negative', 'AI', 'Nova (AI Agent)', '12s', '2m ago', 'billing,refund', 'I can see your refund of $128.40 was issued on Sep 5 and should post within 2-3 business days depending on your bank. I''ve flagged this for priority review.', 94, 1),
('c-1043', 'Sofia Ramirez', 'sofia.ramirez@brightwave.io', '#eb6834', 'email', 'Unable to reset password', 'I keep getting an invalid token error when I click the reset link...', 'resolved', 'neutral', 'AI', 'Atlas (AI Agent)', '4s', '18m ago', 'account,password', 'Generated a fresh reset link since the previous token had expired after 15 minutes, and confirmed successful login.', 97, 2),
('c-1044', 'Jordan Blake', 'jordan.blake@northfield.com', '#1baf7a', 'voice', 'Billing dispute over duplicate charge', 'There are two charges of $49.99 on my card for the same subscription...', 'pending', 'negative', 'AI + Human', 'Maria Chen', '1m 40s', '35m ago', 'billing,dispute', 'Identified a duplicate charge caused by a failed webhook retry, recommended refunding the second charge.', 82, 3),
('c-1045', 'Amara Osei', 'amara.osei@vellumtech.com', '#eda100', 'social', 'Praise for quick support', 'Just wanted to say the chat support today was incredibly fast!', 'resolved', 'positive', 'AI', 'Scout (AI Agent)', '8s', '1h ago', 'feedback,praise', 'Thanked the customer and shared a quick satisfaction survey link.', 99, 4),
('c-1046', 'Wesley Trent', 'wesley.trent@harborline.com', '#e87ba4', 'chat', 'Feature request: dark mode', 'Any plans to add a dark mode to the dashboard? Would love that.', 'escalated', 'neutral', 'Human', 'Devon Brooks', '3m 10s', '2h ago', 'feature-request,product', NULL, NULL, 5),
('c-1047', 'Grace Kim', 'grace.kim@lumenpay.com', '#008300', 'email', 'Data export not completing', 'My export has been stuck at ''processing'' for over an hour now...', 'escalated', 'negative', 'AI + Human', 'Priya Anand', '5m 55s', '3h ago', 'technical,bug', 'Detected the export job stalled due to a timeout on large datasets, recommended a manual re-run with a narrower date range.', 76, 6);

-- Messages
INSERT INTO messages (id, conversation_id, sender, "text", "time", sort_order) VALUES
('m1042-1', 'c-1042', 'customer', 'Hi, I was told my refund would post within 3 days but it''s been a week and I still don''t see it on my statement.', '10:02 AM', 1),
('m1042-2', 'c-1042', 'ai', 'I''m sorry for the delay, Ethan. Let me pull up your refund details right away.', '10:02 AM', 2),
('m1042-3', 'c-1042', 'ai', 'I can see your refund of $128.40 was issued on Sep 5. It can take 2-3 business days depending on your bank, but yours is a bit overdue — I''ve flagged this for priority review with our billing team.', '10:03 AM', 3),
('m1042-4', 'c-1042', 'customer', 'Thank you, please let me know as soon as you hear back.', '10:04 AM', 4),

('m1043-1', 'c-1043', 'customer', 'I keep getting an invalid token error when I click the reset link in the email.', '9:14 AM', 1),
('m1043-2', 'c-1043', 'ai', 'That link expires after 15 minutes for security. I''ve just sent you a brand new one — it should be in your inbox now.', '9:15 AM', 2),
('m1043-3', 'c-1043', 'customer', 'Got it, that one worked. Thanks!', '9:20 AM', 3),

('m1044-1', 'c-1044', 'customer', 'There are two charges of $49.99 on my card for the same subscription this month.', '11:02 AM', 1),
('m1044-2', 'c-1044', 'ai', 'Thanks for calling this in — I can see the duplicate charge on Sep 10. Let me get a specialist to process the refund right away.', '11:04 AM', 2),
('m1044-3', 'c-1044', 'agent', 'Hi Jordan, this is Maria — I''ve confirmed the duplicate and submitted a refund for the second charge. It should land in 3-5 business days.', '11:15 AM', 3),

('m1045-1', 'c-1045', 'customer', 'Just wanted to say the chat support today was incredibly fast! Solved my issue in under a minute.', '2:30 PM', 1),
('m1045-2', 'c-1045', 'ai', 'That means a lot, thank you! I''ve shared a quick survey if you''d like to tell us more — glad we could help.', '2:31 PM', 2),

('m1046-1', 'c-1046', 'customer', 'Any plans to add a dark mode to the dashboard? Would love that.', '3:40 PM', 1),
('m1046-2', 'c-1046', 'agent', 'Great suggestion, Wesley! I don''t have a timeline yet, so I''m escalating this to our product team to track as a feature request.', '3:55 PM', 2),

('m1047-1', 'c-1047', 'customer', 'My export has been stuck at ''processing'' for over an hour now. Can someone check?', '8:05 AM', 1),
('m1047-2', 'c-1047', 'ai', 'I can see the job did stall — likely a timeout given the size of the date range you selected. I''m looping in a specialist to re-run it manually.', '8:10 AM', 2),
('m1047-3', 'c-1047', 'agent', 'Hi Grace, this is Priya — I''ve re-run your export with a narrower date range and it completed successfully. You should see the download link now.', '8:40 AM', 3),
('m1047-4', 'c-1047', 'customer', 'Perfect, I see it now. Thank you!', '8:42 AM', 4);

-- Automation rules
INSERT INTO automation_rules (id, name, "trigger", "action", enabled, hits, sort_order) VALUES
('r1', 'Auto-resolve password reset requests', 'Intent: password_reset', 'Send reset link, close ticket', true, '1,204 / week', 1),
('r2', 'Escalate negative sentiment after 2 replies', 'Sentiment: negative AND reply_count >= 2', 'Route to senior human agent', true, '312 / week', 2),
('r3', 'Auto-tag billing disputes', 'Keyword: duplicate charge, refund, dispute', 'Apply tag ''billing'' and notify billing team', true, '587 / week', 3),
('r4', 'Draft AI reply for FAQ intents', 'Intent: shipping_status, order_tracking', 'Suggest AI-drafted reply for agent approval', false, '0 / week', 4);

# --- !Downs

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS automation_rules;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS agents;
DROP TABLE IF EXISTS channel_mix;
DROP TABLE IF EXISTS response_time_distribution;
DROP TABLE IF EXISTS ticket_categories;
DROP TABLE IF EXISTS csat_trend;
DROP TABLE IF EXISTS resolution_split;
DROP TABLE IF EXISTS volume_trend;
DROP TABLE IF EXISTS kpis;
