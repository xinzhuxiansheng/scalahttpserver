package services

import common.util.StringUtils
import model.FileData
import org.slf4j.LoggerFactory

import scala.collection.mutable.ListBuffer

class FileService {
  val logger = LoggerFactory.getLogger(classOf[FileService])

  def queryFilesOrFolers(path: String): ListBuffer[FileData] = {
    if (StringUtils.isNullOrEmpty(path))
      println("path null 或者空")
    else
      println(s"path :$path")

    var fS = new ListBuffer[FileData]
    val f1 = FileData("file01", "txt", 2209052307L, "文件", "yzhou/test01.dump", 1676601315757L)
    fS.addOne(f1)
    fS
  }
}
