package model

import java.io.File

case class JsonResponse[T](code: Int, data: T, message: String)

case class FileData(id:Int,name: String, fType: String, fSize: Long, fSizeDesc: String
                    , internalPath: String,
                    isHidden: Boolean,
                    modificationTime: Long,
                    modificationTimeDesc: String)

case class FileDesc(name: String, fullName: String, isDic: Boolean,file:File)
