/**
 * Setup express server.
 */

import "express-async-errors"

import cors from "cors"
import express, { type ErrorRequestHandler, json, urlencoded } from "express"
import helmet from "helmet"
import logger from "jet-logger"
import mongoose from "mongoose"
import morgan from "morgan"
import EnvVars from "./constants/EnvVars"
import { NodeEnvs } from "./constants/misc"
import HttpStatusCodes from "./constants/HttpStatusCodes"

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://lippiece.github.io/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms"),
  )
}

app.use(cors())  

//app.use(cors({
  //  origin: ["https://lippiece.github.io/todo/", "https://lippiece.github.io/"]
//}))

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet())
}

// Add APIs, must be after middleware
app.use("/", router)

const errorHandler: ErrorRequestHandler = (error, _, res, _next) => {
  logger.err(error, true)

  if (error[0]?.location) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(error)
  }

  console.log("sending", error.status || HttpStatusCodes.INTERNAL_SERVER_ERROR)
  return res.sendStatus(error.status || HttpStatusCodes.INTERNAL_SERVER_ERROR)
}

// Add error handler
app.use(errorHandler)

export default app
