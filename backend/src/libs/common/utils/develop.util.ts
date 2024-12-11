import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";

export const enum EDevelopmentDependencies {
  DEVELOP = "development",
}

dotenv.config();

export const isDevelopment = (configService: ConfigService) =>
  configService.getOrThrow<string>("NODE_ENV") === EDevelopmentDependencies.DEVELOP;

export const IS_DEVELOP_ENV = process.env.NODE_ENV === EDevelopmentDependencies.DEVELOP;
