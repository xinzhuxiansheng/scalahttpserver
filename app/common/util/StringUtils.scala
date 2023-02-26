package common.util

object StringUtils {

  /**
   * 判断字符串是否是null 或者 空
   */
  def isNullOrEmpty(s: String): Boolean = if (s==null || s.trim.equals("")) true else false
}
