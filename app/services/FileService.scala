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
        dir.listFiles(f => f.getName.contains(keyword))
      // f.getPath 是绝对路径
      var items = filterList
        .map(f => {
          FileData(
            f.getName,
            getFileType(f),
            f.length(),
            "",
            f.getAbsolutePath,
            f.isHidden,
            f.lastModified(),
            longTime2String(f.lastModified()))
        })
      (true, items)
    } catch {
      case exception: Exception => (false, "查询接口异常")
    }
  }

  def createFolder(currentPath: String, newFolderName: String): (Boolean, String) = {
    try {
      logger.info(s"createFolder currentPath:${currentPath}, newFolderName:${newFolderName}")
      var directory = currentPath
      if (StringUtils.isNullOrBlank(directory) || directory == "/")
        directory = "/Users/yiche/Desktop/Tmp";
      else
        directory = "/Users/yiche/Desktop/Tmp" + directory

      val dir = new File(directory);
      if (!dir.exists()) {
        dir.mkdir()
        (true, "目录创建成功!")
      } else {
        (false, "目录已存在")
      }
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

  def getFileType(file: File): String = {
    if (file.isDirectory) {
      return "folder"
    }
    val fileName = file.getName
    val dotIndex = fileName.lastIndexOf(".")
    if (dotIndex > 0) {
      val extension = fileName.substring(dotIndex + 1)
      extension match {
        case "jpg" => "image" //<FileImageOutlined />
        case "png" => "image" //
        case "pdf" => "pdf" //<FilePdfOutlined />
        case "doc" => "word" //<FileWordOutlined />
        case "xls" => "excel" //<FileExcelOutlined />
        case "xlsx" => "excel" //<FileExcelOutlined />
        case "ppt" => "ppt" //<FilePptOutlined />
        case "md" => "md" //<FileMarkdownOutlined />
        case "zip" => "yasuobao" //<FileZipOutlined />
        case "tgz" => "yasuobao" //<FileZipOutlined />
        case _ => "txt" //<FileTextOutlined />
      }
    } else {
      "txt" //<FileTextOutlined />
    }
  }
}
