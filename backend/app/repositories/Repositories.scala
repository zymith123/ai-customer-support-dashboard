package repositories

import javax.inject.{Inject, Singleton}
import play.api.db.Database
import anorm._
import anorm.SqlParser._
import models._

@Singleton
class KpiRepository @Inject() (db: Database) {
  private val parser: RowParser[Kpi] =
    (str("label") ~ str("value") ~ str("delta") ~ str("delta_dir") ~ str("sub")).map {
      case label ~ value ~ delta ~ deltaDir ~ sub => Kpi(label, value, delta, deltaDir, sub)
    }

  def findAll(): Seq[Kpi] = db.withConnection { implicit c =>
    SQL("SELECT label, value, delta, delta_dir, sub FROM kpis ORDER BY sort_order").as(parser.*)
  }
}

@Singleton
class VolumeTrendRepository @Inject() (db: Database) {
  private val parser: RowParser[VolumeTrendPoint] =
    (str("day") ~ int("chat") ~ int("email") ~ int("voice") ~ int("social")).map {
      case day ~ chat ~ email ~ voice ~ social => VolumeTrendPoint(day, chat, email, voice, social)
    }

  def findAll(): Seq[VolumeTrendPoint] = db.withConnection { implicit c =>
    SQL("SELECT day, chat, email, voice, social FROM volume_trend ORDER BY sort_order").as(parser.*)
  }
}

@Singleton
class ResolutionSplitRepository @Inject() (db: Database) {
  private val parser: RowParser[ResolutionSplitItem] =
    (str("name") ~ int("value") ~ str("key")).map {
      case name ~ value ~ key => ResolutionSplitItem(name, value, key)
    }

  def findAll(): Seq[ResolutionSplitItem] = db.withConnection { implicit c =>
    SQL("SELECT name, value, key FROM resolution_split ORDER BY sort_order").as(parser.*)
  }
}

@Singleton
class CsatTrendRepository @Inject() (db: Database) {
  private val parser: RowParser[CsatTrendPoint] =
    (str("week") ~ double("csat")).map {
      case week ~ csat => CsatTrendPoint(week, csat)
    }

  def findAll(): Seq[CsatTrendPoint] = db.withConnection { implicit c =>
    SQL("SELECT week, csat FROM csat_trend ORDER BY sort_order").as(parser.*)
  }
}

@Singleton
class TicketCategoryRepository @Inject() (db: Database) {
  private val parser: RowParser[TicketCategory] =
    (str("category") ~ int("tickets")).map {
      case category ~ tickets => TicketCategory(category, tickets)
    }

  def findAll(): Seq[TicketCategory] = db.withConnection { implicit c =>
    SQL("SELECT category, tickets FROM ticket_categories ORDER BY sort_order").as(parser.*)
  }
}

@Singleton
class ResponseTimeRepository @Inject() (db: Database) {
  private val parser: RowParser[ResponseTimeBucket] =
    (str("bucket") ~ int("pct")).map {
      case bucket ~ pct => ResponseTimeBucket(bucket, pct)
    }

  def findAll(): Seq[ResponseTimeBucket] = db.withConnection { implicit c =>
    SQL("SELECT bucket, pct FROM response_time_distribution ORDER BY sort_order").as(parser.*)
  }
}

@Singleton
class ChannelMixRepository @Inject() (db: Database) {
  private val parser: RowParser[ChannelMixItem] =
    (str("name") ~ int("value") ~ str("key")).map {
      case name ~ value ~ key => ChannelMixItem(name, value, key)
    }

  def findAll(): Seq[ChannelMixItem] = db.withConnection { implicit c =>
    SQL("SELECT name, value, key FROM channel_mix ORDER BY sort_order").as(parser.*)
  }
}

@Singleton
class AgentRepository @Inject() (db: Database) {
  private val parser: RowParser[Agent] =
    (str("id") ~ str("name") ~ str("type") ~ str("avatar_color") ~ int("resolved") ~
      str("avg_handle_time") ~ double("csat") ~ int("autonomy_rate").? ~ str("status")).map {
      case id ~ name ~ typ ~ avatarColor ~ resolved ~ avgHandleTime ~ csat ~ autonomyRate ~ status =>
        Agent(id, name, typ, avatarColor, resolved, avgHandleTime, csat, autonomyRate, status)
    }

  def findAll(): Seq[Agent] = db.withConnection { implicit c =>
    SQL("SELECT id, name, type, avatar_color, resolved, avg_handle_time, csat, autonomy_rate, status FROM agents ORDER BY sort_order").as(parser.*)
  }
}

@Singleton
class AutomationRuleRepository @Inject() (db: Database) {
  private val parser: RowParser[AutomationRule] =
    (str("id") ~ str("name") ~ str("trigger") ~ str("action") ~ bool("enabled") ~ str("hits")).map {
      case id ~ name ~ trigger ~ action ~ enabled ~ hits => AutomationRule(id, name, trigger, action, enabled, hits)
    }

  def findAll(): Seq[AutomationRule] = db.withConnection { implicit c =>
    SQL("""SELECT id, name, "trigger", "action", enabled, hits FROM automation_rules ORDER BY sort_order""").as(parser.*)
  }
}

@Singleton
class ConversationRepository @Inject() (db: Database) {

  private def splitTags(tags: String): Seq[String] =
    if (tags.trim.isEmpty) Seq.empty else tags.split(",").toIndexedSeq.map(_.trim)

  private val listParser: RowParser[ConversationListItem] =
    (str("id") ~ str("customer") ~ str("email") ~ str("avatar_color") ~ str("channel") ~
      str("subject") ~ str("preview") ~ str("status") ~ str("sentiment") ~ str("handled_by") ~
      str("agent") ~ str("wait_time") ~ str("updated") ~ str("tags")).map {
      case id ~ customer ~ email ~ avatarColor ~ channel ~ subject ~ preview ~ status ~
        sentiment ~ handledBy ~ agent ~ waitTime ~ updated ~ tags =>
        ConversationListItem(id, customer, email, avatarColor, channel, subject, preview, status,
          sentiment, handledBy, agent, waitTime, updated, splitTags(tags))
    }

  private val detailBaseParser =
    str("id") ~ str("customer") ~ str("email") ~ str("avatar_color") ~ str("channel") ~
      str("subject") ~ str("preview") ~ str("status") ~ str("sentiment") ~ str("handled_by") ~
      str("agent") ~ str("wait_time") ~ str("updated") ~ str("tags") ~
      str("ai_suggestion").? ~ int("ai_confidence").?

  private val messageParser: RowParser[Message] =
    (str("id") ~ str("sender") ~ str("text") ~ str("time")).map {
      case id ~ sender ~ text ~ time => Message(id, sender, text, time)
    }

  def findAll(): Seq[ConversationListItem] = db.withConnection { implicit c =>
    SQL("""SELECT id, customer, email, avatar_color, channel, subject, preview, status, sentiment,
          handled_by, agent, wait_time, updated, tags FROM conversations ORDER BY sort_order""").as(listParser.*)
  }

  def findById(id: String): Option[ConversationDetail] = db.withConnection { implicit c =>
    val baseOpt = SQL("""SELECT id, customer, email, avatar_color, channel, subject, preview, status,
          sentiment, handled_by, agent, wait_time, updated, tags, ai_suggestion, ai_confidence
          FROM conversations WHERE id = {id}""").on("id" -> id).as(detailBaseParser.singleOpt)

    baseOpt.map {
      case cid ~ customer ~ email ~ avatarColor ~ channel ~ subject ~ preview ~ status ~
        sentiment ~ handledBy ~ agent ~ waitTime ~ updated ~ tags ~ aiSuggestion ~ aiConfidence =>
        val messages = SQL("""SELECT id, sender, "text", "time" FROM messages
              WHERE conversation_id = {id} ORDER BY sort_order""")
          .on("id" -> id).as(messageParser.*)

        ConversationDetail(cid, customer, email, avatarColor, channel, subject, preview, status,
          sentiment, handledBy, agent, waitTime, updated, splitTags(tags), aiSuggestion, aiConfidence, messages)
    }
  }
}
