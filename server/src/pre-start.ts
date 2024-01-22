/**
 * Pre-start is where we want to place things that must run BEFORE the express
 * server is started. This is useful for environment variables, command-line
 * arguments, and cron-jobs.
 */

// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import path from "node:path"

import { config } from "dotenv"
import { parse } from "ts-command-line-args"

// **** Setup **** //

// Command line arguments
const args = parse({
  env: {
    alias: "e",
    defaultValue: "development",
    type: String,
  },
})

// Set the env file
const dotenvConfig = config({
  path: path.join(__dirname, `../env/.env.${args.env}`),
})

if (dotenvConfig.error) {
  throw dotenvConfig.error
}
