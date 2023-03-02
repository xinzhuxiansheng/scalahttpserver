package services

import common.util.StringUtils
import model.FileData
import org.joda.time.DateTime
import org.slf4j.LoggerFactory

import java.io.File

class FileService {
  val logger = LoggerFactory.getLogger(classOf[FileService])

  def queryFilesOrFolers(path: String, keyword: String): (Boolean, Any) = {
    try {
      logger.info(s"queryFilesOrFolers path:${path}, keyword:${keyword}")
      var directory = path
      if (StringUtils.isNullOrBlank(directory) || directory == "/")
        directory = "/Users/yiche/Desktop/Tmp";

      val dir = new File(directory);
      val filterList = if (StringUtils.isNullOrBlank(keyword)) dir.listFiles() else
        dir.listFiles(f => f.getName == keyword)
      // f.getPath 是绝对路径
      var items = filterList
        .map(f => FileData(
          f.getName,
          "txt",
          f.length(),
          "文件",
          f.getAbsolutePath,
          f.isHidden,
          f.lastModified(),
          longTime2String(f.lastModified()))
        )
      (true, items)
    } catch {
      case exception: Exception => (false, "查询接口异常")
    }
  }

  /**
   * long类型时间转 字符串
   */
  def longTime2String(timestamp: Long): String = {
    val time: DateTime = new DateTime(timestamp)
    return time.toString("yyyy-MM-dd HH:mm:ss")
  }
}
