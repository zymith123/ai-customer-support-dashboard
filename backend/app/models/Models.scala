package models

import play.api.libs.json._

case class Kpi(
  label: String,
  value: String,
  delta: String,
  deltaDir: String,
  sub: String
)

object Kpi {
  implicit val writes: Writes[Kpi] = Json.writes[Kpi]
}

case class VolumeTrendPoint(
  day: String,
  chat: Int,
  email: Int,
  voice: Int,
  social: Int
)

object VolumeTrendPoint {
  implicit val writes: Writes[VolumeTrendPoint] = Json.writes[VolumeTrendPoint]
}

case class ResolutionSplitItem(
  name: String,
  value: Int,
  key: String
)

object ResolutionSplitItem {
  implicit val writes: Writes[ResolutionSplitItem] = Json.writes[ResolutionSplitItem]
}

case class CsatTrendPoint(
  week: String,
  csat: Double
)

object CsatTrendPoint {
  implicit val writes: Writes[CsatTrendPoint] = Json.writes[CsatTrendPoint]
}

case class TicketCategory(
  category: String,
  tickets: Int
)

object TicketCategory {
  implicit val writes: Writes[TicketCategory] = Json.writes[TicketCategory]
}

case class ResponseTimeBucket(
  bucket: String,
  pct: Int
)

object ResponseTimeBucket {
  implicit val writes: Writes[ResponseTimeBucket] = Json.writes[ResponseTimeBucket]
}

case class ChannelMixItem(
  name: String,
  value: Int,
  key: String
)

object ChannelMixItem {
  implicit val writes: Writes[ChannelMixItem] = Json.writes[ChannelMixItem]
}

case class Agent(
  id: String,
  name: String,
  `type`: String,
  avatarColor: String,
  resolved: Int,
  avgHandleTime: String,
  csat: Double,
  autonomyRate: Option[Int],
  status: String
)

object Agent {
  implicit val writes: Writes[Agent] = Json.writes[Agent]
}

case class ConversationListItem(
  id: String,
  customer: String,
  email: String,
  avatarColor: String,
  channel: String,
  subject: String,
  preview: String,
  status: String,
  sentiment: String,
  handledBy: String,
  agent: String,
  waitTime: String,
  updated: String,
  tags: Seq[String]
)

object ConversationListItem {
  implicit val writes: Writes[ConversationListItem] = Json.writes[ConversationListItem]
}

case class Message(
  id: String,
  from: String,
  text: String,
  time: String
)

object Message {
  implicit val writes: Writes[Message] = Json.writes[Message]
}

case class ConversationDetail(
  id: String,
  customer: String,
  email: String,
  avatarColor: String,
  channel: String,
  subject: String,
  preview: String,
  status: String,
  sentiment: String,
  handledBy: String,
  agent: String,
  waitTime: String,
  updated: String,
  tags: Seq[String],
  aiSuggestion: Option[String],
  aiConfidence: Option[Int],
  messages: Seq[Message]
)

object ConversationDetail {
  implicit val writes: Writes[ConversationDetail] = Json.writes[ConversationDetail]
}

case class AutomationRule(
  id: String,
  name: String,
  trigger: String,
  action: String,
  enabled: Boolean,
  hits: String
)

object AutomationRule {
  implicit val writes: Writes[AutomationRule] = Json.writes[AutomationRule]
}
