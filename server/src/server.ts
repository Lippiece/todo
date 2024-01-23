/**
 * Setup express server.
 */

import "express-async-errors"

import EnvVars from "@src/constants/EnvVars"
import HttpStatusCodes from "@src/constants/HttpStatusCodes"
import { NodeEnvs } from "@src/constants/misc"
import { RouteError } from "@src/other/classes"
import express, { type ErrorRequestHandler, json, urlencoded } from "express"
import helmet from "helmet"
import logger from "jet-logger"
import mongoose from "mongoose"
import morgan from "morgan"

import router from "./routes/api"

// **** Variables **** //

const app = express()

// **** Setup **** //

// Mongoose
const connectToMongo = async () => {
  try {
    logger.info(`Connecting to ${EnvVars.MONGO}`)
    await mongoose.connect(EnvVars.MONGO)
    logger.info("MongoDB connected")
  } catch (error) {
    logger.err(error)
  }
}

connectToMongo()

// Basic middleware
app.use(json())
app.use(urlencoded({ extended: true }))

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan("dev"))
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet())
}

// Add APIs, must be after middleware
app.use("/", router)

const errorHandler: ErrorRequestHandler = (error, _, res) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(error, true)
  }

  let status = HttpStatusCodes.INTERNAL_SERVER_ERROR

  if (error instanceof RouteError) {
    status = error.status
  }

  return res.send(status)
}
// Add error handler
app.use(errorHandler)

export default app
