package controllers

import model.{FileData, JsonResult}
import play.api.libs.Files.TemporaryFile
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}

import javax.inject._
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc._
import services.FileService

import java.io.File
import java.nio.file.Paths
//import scala.concurrent.ExecutionContext
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class HomeController @Inject()(fileService: FileService)(cc: ControllerComponents)
  extends AbstractController(cc) {

  //定义一个writes
  implicit val fileDataWrites: Writes[FileData] = (
    (JsPath \ "id").write[Int] and
      (JsPath \ "name").write[String] and
      (JsPath \ "fType").write[String] and
      (JsPath \ "fSize").write[Long] and
      (JsPath \ "fSizeDesc").write[String] and
      (JsPath \ "internalPath").write[String] and
      (JsPath \ "isHidden").write[Boolean] and
      (JsPath \ "modificationTime").write[Long] and
      (JsPath \ "modificationTimeDesc").write[String]

    ) (unlift(FileData.unapply))


  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed!"))
  }

  def pathIndex(path: String, keyword: String, isHidden: Boolean) = Action {
    var (status, data) = fileService.queryFilesOrFolers(path, keyword, isHidden)
    if (status) {
      Ok(JsonResult.success(data.asInstanceOf[Array[FileData]]))
    } else {
      Ok(JsonResult.error(500, data.toString))
    }
  }

  def createFolder() = Action { implicit request: Request[AnyContent] =>
    (for {
      js <- request.body.asJson
      currentPath <- (js \ "currentPath").asOpt[String]
      newFolderName <- (js \ "newFolderName").asOpt[String]
    } yield {
      val (status, data) = fileService.createFolder(currentPath, newFolderName)
      if (status) {
        Ok(JsonResult.success(data))
      } else {
        Ok(JsonResult.error(500, data))
      }
    }).getOrElse(Ok(Json.obj("code" -> "500", "msg" -> "无效参数")))
  }

  // Set the maximum file size and disk length to 10 MB
  val maxFileSize: Long = 1024 * 1024 * 1024
  val maxDiskLength: Long = 1024 * 1024 * 1024

  def upload: Action[MultipartFormData[TemporaryFile]] = Action(parse.multipartFormData) { request =>
    val currentPath = request.body.dataParts.get("currentPath").flatMap(_.headOption) // 包含 currentPath
    request.body.file("file").map { file =>
      val filename = Paths.get(file.filename).getFileName
      val fileSize = file.fileSize
      val contentType = file.contentType

      val (status, data) = fileService.upload(file, currentPath.get)
      if (status) {
        Ok(JsonResult.success(data))
      } else {
        Ok(JsonResult.error(500, data))
      }
    }
      .getOrElse {
        Ok(JsonResult.error(500, "服务异常，请稍后重试"))
      }
  }

  // 删除资源
  def deleteResource() = Action { implicit request: Request[AnyContent] =>
    (for {
      js <- request.body.asJson
      currentPath <- (js \ "currentPath").asOpt[String]
      resourceName <- (js \ "resourceName").asOpt[String]
    } yield {
      val (status, data) = fileService.deleteResource(resourceName, currentPath)
      if (status) {
        Ok(JsonResult.success(data))
      } else {
        Ok(JsonResult.error(500, data))
      }
    }).getOrElse(Ok(Json.obj("code" -> "500", "msg" -> "无效参数")))
  }

  // 下载资源
  def downloadResource(currentPath: String, resourceName: String) = Action {
    val fileDesc = fileService.downloadResource(currentPath, resourceName)
    Results.Ok.sendFile(fileDesc.file, false, fileName = _ => Some(fileDesc.fullName))
  }

}
