import "./pre-start"

import logger from "jet-logger"

import EnvironmentVariables from "./constants/EnvVars"
import app from "./server"


// **** Run **** //

const SERVER_START_MSG = `Express server started on port: ${EnvironmentVariables.Port.toString()}`

app.listen(EnvironmentVariables.Port, () => { logger.info(SERVER_START_MSG); })
