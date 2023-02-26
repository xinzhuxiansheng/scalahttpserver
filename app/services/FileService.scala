package services

import common.util.StringUtils
import model.FileData
import org.slf4j.LoggerFactory

import java.io.File
import scala.collection.mutable.ListBuffer

class FileService {
  val logger = LoggerFactory.getLogger(classOf[FileService])

  def queryFilesOrFolers(path: String): Array[FileData] = {
    var directory = path
    if (StringUtils.isNullOrEmpty(directory))
      directory = "/Users/yiche/Desktop/Tmp";

    val dir = new File(directory);
    // f.getPath 是绝对路径
    var items = dir.listFiles().map(f => FileData(f.getName, "txt", f.length(), "文件", f.getAbsolutePath, f.lastModified()))

    dir.listFiles().foreach(f =>{
      println("f")
      println("f")
    })

    items
  }
}
