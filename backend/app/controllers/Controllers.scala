package controllers

import javax.inject.{Inject, Singleton}
import play.api.mvc._
import play.api.libs.json._
import models._
import repositories._

@Singleton
class KpiController @Inject() (cc: ControllerComponents, repo: KpiRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }
}

@Singleton
class VolumeTrendController @Inject() (cc: ControllerComponents, repo: VolumeTrendRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }
}

@Singleton
class ResolutionSplitController @Inject() (cc: ControllerComponents, repo: ResolutionSplitRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }
}

@Singleton
class CsatTrendController @Inject() (cc: ControllerComponents, repo: CsatTrendRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }
}

@Singleton
class TicketCategoryController @Inject() (cc: ControllerComponents, repo: TicketCategoryRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }
}

@Singleton
class ResponseTimeController @Inject() (cc: ControllerComponents, repo: ResponseTimeRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }
}

@Singleton
class ChannelMixController @Inject() (cc: ControllerComponents, repo: ChannelMixRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }
}

@Singleton
class AgentController @Inject() (cc: ControllerComponents, repo: AgentRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }
}

@Singleton
class AutomationRuleController @Inject() (cc: ControllerComponents, repo: AutomationRuleRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }

  def updateEnabled(id: String): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[RuleUpdateRequest] match {
      case JsError(errors) => BadRequest(Json.obj("error" -> "invalid_body", "details" -> JsError.toJson(errors)))
      case JsSuccess(body, _) =>
        repo.updateEnabled(id, body.enabled) match {
          case Some(rule) => Ok(Json.toJson(rule))
          case None => NotFound(Json.obj("error" -> "not_found"))
        }
    }
  }
}

@Singleton
class ConversationController @Inject() (cc: ControllerComponents, repo: ConversationRepository) extends AbstractController(cc) {
  private val MaxMessageLength = 1000

  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }

  def get(id: String): Action[AnyContent] = Action {
    repo.findById(id) match {
      case Some(conversation) => Ok(Json.toJson(conversation))
      case None => NotFound(Json.obj("error" -> "not_found"))
    }
  }

  def postMessage(id: String): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[NewMessageRequest] match {
      case JsError(errors) => BadRequest(Json.obj("error" -> "invalid_body", "details" -> JsError.toJson(errors)))
      case JsSuccess(body, _) =>
        val text = body.text.trim
        if (text.isEmpty) BadRequest(Json.obj("error" -> "text_required"))
        else if (text.length > MaxMessageLength) BadRequest(Json.obj("error" -> "text_too_long", "max" -> MaxMessageLength))
        else
          repo.addMessage(id, text) match {
            case Some(message) => Created(Json.toJson(message))
            case None => NotFound(Json.obj("error" -> "not_found"))
          }
    }
  }
}

@Singleton
class SettingsController @Inject() (cc: ControllerComponents, repo: SettingsRepository) extends AbstractController(cc) {
  private val allowedTones = Set("friendly", "professional", "concise", "empathetic")
  private val MaxNameLength = 150
  private val MaxEmailLength = 150
  private val emailPattern = """^[^\s@]+@[^\s@]+\.[^\s@]+$""".r

  def get: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.get()))
  }

  def update: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Settings] match {
      case JsError(errors) => BadRequest(Json.obj("error" -> "invalid_body", "details" -> JsError.toJson(errors)))
      case JsSuccess(s, _) =>
        val name = s.workspaceName.trim
        val email = s.supportEmail.trim
        if (!allowedTones.contains(s.tone))
          BadRequest(Json.obj("error" -> "invalid_tone", "allowed" -> allowedTones))
        else if (s.confidenceThreshold < 0 || s.confidenceThreshold > 100)
          BadRequest(Json.obj("error" -> "confidence_out_of_range"))
        else if (name.isEmpty || name.length > MaxNameLength)
          BadRequest(Json.obj("error" -> "invalid_workspace_name"))
        else if (email.isEmpty || email.length > MaxEmailLength || emailPattern.findFirstMatchIn(email).isEmpty)
          BadRequest(Json.obj("error" -> "invalid_support_email"))
        else
          Ok(Json.toJson(repo.update(s.copy(workspaceName = name, supportEmail = email))))
    }
  }
}
