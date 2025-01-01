import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { StorageModule } from "@/storage/storage.module";

@Module({
  imports: [StorageModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
