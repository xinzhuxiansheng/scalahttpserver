package controllers

import model.FileData
import play.api.libs.functional.syntax.unlift

import javax.inject._
import play.api.libs.json.{Json, Writes}
import play.api.mvc._
import services.FileService

@Singleton
class HomeController @Inject()(fileService: FileService)(cc: ControllerComponents)
  extends AbstractController(cc) {

  //  implicit val placeWrites: Writes[FileData] = ()(unlift(FileData.unapply))
  implicit val fileDataWrites = Json.writes[FileData]

  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed!"))
  }

  def pathIndex(path: String) = Action {
    Ok(Json.toJson(fileService.queryFilesOrFolers(path)))
  }
}
