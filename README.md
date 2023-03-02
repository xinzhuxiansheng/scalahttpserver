
## 介绍
ScalaHttpServer Scala文件服务器，是由React 、Play框架开发

## 调试
IDEA中调试 Play服务接口，请勿使用`use sbt shell`

## Scala Play React Seed
服务是参考 scala play react seed项目模板构建，集成React的编译、打包、部署，

该项目的介绍请跳转至 https://github.com/playframework/play-scala-react-seed


* Used any of the following [SBT](http://www.scala-sbt.org/) commands which will intern trigger frontend associated npm scripts.

```
    sbt clean           # Clean existing build artifacts

    sbt stage           # Build your application from your project’s source directory

    sbt run             # Run both backend and frontend builds in watch mode

    sbt dist            # Build both backend and frontend sources into a single distribution artifact

    sbt test            # Run both backend and frontend unit tests
```