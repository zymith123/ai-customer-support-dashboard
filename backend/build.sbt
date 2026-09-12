name := """aria-support-backend"""
organization := "com.ariasupport"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.15"

libraryDependencies ++= Seq(
  guice,
  jdbc,
  evolutions,
  "org.playframework.anorm" %% "anorm" % "2.7.0",
  "org.postgresql" % "postgresql" % "42.7.4",
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test
)
