package controllers

import model.{FileData, JsonResponse, JsonResult}
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}

import javax.inject._
import play.api.libs.json.{JsObject, JsPath, JsValue, Json, Writes}
import play.api.mvc._
import services.FileService

@Singleton
class HomeController @Inject()(fileService: FileService)(cc: ControllerComponents)
  extends AbstractController(cc) {

  //定义一个writes
  implicit val fileDataWrites: Writes[FileData] = (
    (JsPath \ "name").write[String] and
      (JsPath \ "type").write[String] and
      (JsPath \ "size").write[Long] and
      (JsPath \ "sizeDesc").write[String] and
      (JsPath \ "internalPath").write[String] and
      (JsPath \ "modificationTime").write[Long]
    ) (unlift(FileData.unapply))


  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed!"))
  }

  def pathIndex(path: String,keyword:String) = Action {
    var (status, data) = fileService.queryFilesOrFolers(path,keyword)
    if (status) {
      Ok(JsonResult.success(data.asInstanceOf[Array[FileData]]))
    } else {
      Ok(JsonResult.error(500, data.toString))
    }
  }
}
