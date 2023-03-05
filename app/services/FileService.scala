package services

import common.util.StringUtils
import model.{FileData, FileDesc}
import org.joda.time.DateTime
import org.slf4j.LoggerFactory
import play.api.libs.Files
import play.api.mvc.MultipartFormData

import java.io.{BufferedInputStream, File, FileInputStream, FileOutputStream}
import java.util.zip.{ZipEntry, ZipOutputStream}

class FileService {
  val logger = LoggerFactory.getLogger(classOf[FileService])

  val rootPath = "/Users/yiche/Desktop/Tmp";

  def queryFilesOrFolers(path: String, keyword: String, isHidden: Boolean): (Boolean, Any) = {
    try {
      logger.info(s"queryFilesOrFolers path:${path}, keyword:${keyword}")
      var directory = path
      if (StringUtils.isNullOrBlank(directory) || directory == "/")
        directory = rootPath;

      val dir = new File(directory);

      val filterList = if (StringUtils.isNullOrBlank(keyword)) dir.listFiles() else
        dir.listFiles(f => {
          var iskeywordF = true
          var ishiddenF = true
          if (StringUtils.isNullOrBlank(keyword) && !f.getName.contains(keyword))
            iskeywordF = false
          if (isHidden && !f.isHidden)
            ishiddenF = false
          iskeywordF && ishiddenF
        })
      // f.getPath 是绝对路径
      var items = filterList.zipWithIndex
        .map {
          case (f, index) => {
            FileData(
              index,
              f.getName,
              getFileType(f),
              f.length(),
              "",
              f.getAbsolutePath,
              f.isHidden,
              f.lastModified(),
              longTime2String(f.lastModified()))
          }
        }
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
        directory = rootPath + "/" + newFolderName;
      else
        directory = rootPath + directory + "/" + newFolderName

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

  def upload(filePart: MultipartFormData.FilePart[Files.TemporaryFile], currentPath: String): (Boolean, String) = {
    try {
      val targetFile = new File(s"$rootPath$currentPath/${filePart.filename}")
      if (targetFile.exists()) {
        return (false, "当前路径下已存在同名文件，无法上传")
      }
      filePart.ref.moveTo(new File(s"$rootPath$currentPath/${filePart.filename}"))
      (true, "OK")
    } catch {
      case exception: Exception => (false, "上传文件异常")
    }
  }

  def deleteResource(resourceName: String, currentPath: String): (Boolean, String) = {
    val resourcePath = s"$rootPath$currentPath/$resourceName";
    val resource = new File(resourcePath)
    if (resource.exists()) {
      if (resource.isDirectory) {
        deleteDirectory(resource);
      } else {
        if (resource.isFile) {
          resource.delete()
        }
      }
      (true, "OK")
    } else {
      (false, "当前目录或者资源不存在")
    }
  }

  def downloadResource(currentPath: String, resourceName: String): FileDesc = {
    val resourcePath = s"$rootPath$currentPath/$resourceName"
    val resourceFile = new File(resourcePath)
    //      if(resourceFile.exists()){
    if (resourceFile.isDirectory) {
      val newZipResourcePath = s"$resourcePath.zip"
      val zipFile = new File(newZipResourcePath)
      val zipOutputStream = new ZipOutputStream(new FileOutputStream(zipFile))
      zipFiles(resourceFile.listFiles, "", zipOutputStream)
      zipOutputStream.close()
      FileDesc(resourceName, s"$resourceName.zip", true, zipFile)
    } else {
      FileDesc(resourceName, resourceName, false, resourceFile)
    }
    //      }
  }

  private def zipFiles(files: Array[File], path: String, zipOutputStream: ZipOutputStream): Unit = {
    files.foreach { file =>
      if (file.isDirectory) {
        zipFiles(file.listFiles, path + file.getName + "/", zipOutputStream)
      } else {
        val entry = new ZipEntry(path + file.getName)
        zipOutputStream.putNextEntry(entry)
        val in = new BufferedInputStream(new FileInputStream(file))
        var b = in.read()
        while (b > -1) {
          zipOutputStream.write(b)
          b = in.read()
        }
        in.close()
      }
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

  def deleteDirectory(directory: File): Unit = {
    val files = directory.listFiles()
    if (files != null) {
      for (file <- files) {
        if (file.isDirectory()) {
          deleteDirectory(file)
        } else {
          file.delete()
        }
      }
    }
    directory.delete()
  }


}
