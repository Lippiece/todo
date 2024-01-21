/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

export default {
  CookieProps: {
    Key: "ExpressGeneratorTs",


    // Casing to match express cookie options
    Options: {
      domain: process.env.COOKIE_DOMAIN ?? "",
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      path: process.env.COOKIE_PATH ?? "",
      secure: process.env.SECURE_COOKIE === "true",
      signed: true,
    },

    Secret: process.env.COOKIE_SECRET ?? "",
  },

  Jwt: {
    Exp: process.env.COOKIE_EXP ?? "", // exp at the same time as the cookie
    Secret: process.env.JWT_SECRET ?? "",
  },

  MONGO: process.env.MONGO ?? "",
  NodeEnv: process.env.NODE_ENV ?? "",
  Port: process.env.PORT ?? 3000,
} as const
