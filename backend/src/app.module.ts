import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { IS_DEVELOP_ENV } from "./libs/common/utils/develop.util";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !IS_DEVELOP_ENV,
    }),
  ],
})
export class AppModule {}
