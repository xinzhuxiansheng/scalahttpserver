package method

import org.scalatest.funsuite.AnyFunSuite

import java.time.Instant
import java.time.format.DateTimeFormatter

class MyMethodsSuite extends AnyFunSuite{

  test("myMethod should return correct result") {
    val timestamp = 1645839642000L
    val instant = Instant.ofEpochMilli(timestamp)
    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
    println(formatter.format(instant))
  }


}
