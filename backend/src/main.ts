import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import IOredis from "ioredis";
import * as session from "express-session";
import { ms, StringValue } from "./libs/common/utils/ms.util";
import { parseBoolean } from "./libs/common/utils/parse-boolean.util";
import { RedisStore } from "connect-redis";
import * as express from "express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const redis = new IOredis(config.getOrThrow<string>("REDIS_URI"));
  app.use("/public", express.static(join(__dirname, "..", "public")));
  app.use(
    session({
      secret: config.getOrThrow<string>("SESSION_SECRET"),
      name: config.getOrThrow<string>("SESSION_NAME"),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>("SESSION_DOMAIN"),
        maxAge: ms(config.getOrThrow<StringValue>("SESSION_MAX_AGE")),
        httpOnly: parseBoolean(config.getOrThrow<string>("SESSION_HTTP_ONLY")),
        secure: parseBoolean(config.getOrThrow<string>("SESSION_SECURE")),
        sameSite: "lax",
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow<string>("SESSION_FOLDER"),
      }),
    }),
  );

  app.use(cookieParser(config.getOrThrow<string>("COOKIES_SECRET")));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: config.getOrThrow<string>("ALLOWED_ORIGIN"),
    credentials: true,
    exposedHeaders: ["set-cookie"],
  });

  await app.listen(config.getOrThrow<number>("APPLICATION_PORT"));
}
bootstrap();
