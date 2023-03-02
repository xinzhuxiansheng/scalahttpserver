package model

case class JsonResponse[T](code: Int, data: T, message: String)

case class FileData(name: String, fType: String, fSize: Long, fSizeDesc: String
                    , internalPath: String,
                    isHidden: Boolean,
                    modificationTime: Long,
                    modificationTimeDesc: String)
