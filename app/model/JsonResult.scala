package model

import play.api.libs.json.{JsNull, JsValue, Json, Writes}

object JsonResult {
  def success[T](data: T)(implicit w: Writes[T]): JsValue = {
    Json.obj(
      "code" -> 200,
      "data" -> w.writes(data),
      "message" -> "success"
    )
  }

  def error(code:Int, message: String): JsValue = {
    Json.obj(
      "code" -> code,
      "data" -> JsNull,
      "message" -> message
    )
  }
}
