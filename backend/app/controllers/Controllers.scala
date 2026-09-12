package controllers

import javax.inject.{Inject, Singleton}
import play.api.mvc._
import play.api.libs.json._
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
}

@Singleton
class ConversationController @Inject() (cc: ControllerComponents, repo: ConversationRepository) extends AbstractController(cc) {
  def list: Action[AnyContent] = Action {
    Ok(Json.toJson(repo.findAll()))
  }

  def get(id: String): Action[AnyContent] = Action {
    repo.findById(id) match {
      case Some(conversation) => Ok(Json.toJson(conversation))
      case None => NotFound(Json.obj("error" -> "not_found"))
    }
  }
}
