import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { Authorized } from "@/auth/decorators/authorized.decorator";
import { Authorization } from "@/auth/decorators/auth.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@/auth/guards/auth.guard";
import { UserProfileDto } from "./dto/profile-user-dto";
import { ApiResponse } from "@/libs/common/utils/response";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageService } from "@/storage/storage.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {}

  @UseGuards(AuthGuard)
  @Get("profile")
  @HttpCode(HttpStatus.OK)
  public async findProfile(@Authorized("sub") userId: string): Promise<ApiResponse<UserProfileDto>> {
    try {
      const userProfile = await this.userService.findById(userId);
      return {
        data: userProfile,
        message: "User profile retrieved successfully.",
        error: "",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error retrieving user profile.",
        error: error.message || "Unknown error",
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  @Get("/:id")
  @Authorization()
  @HttpCode(HttpStatus.OK)
  public async findById(@Param("id") userId: string) {
    return this.userService.findById(userId);
  }

  @Patch("profile")
  @Authorization()
  @HttpCode(HttpStatus.OK)
  public async updateProfile(@Authorized("id") userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(userId, dto);
  }

  @Patch("profile/photo")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public async uploadPhoto(@Authorized("sub") userId: string, @UploadedFile() file: Express.Multer.File) {
    try {
      const photoUrl = await this.storageService.uploadFile(userId, file);
      const currentUser = await this.userService.findById(userId);

      const updatedUserDto: UpdateUserDto = {
        name: currentUser.username,
        email: currentUser.email,
        isTwoFactorEnabled: currentUser.isTwoFactorEnabled,
        picture: photoUrl,
      };

      const user = await this.userService.update(userId, updatedUserDto);

      return {
        data: user,
        message: "User photo uploaded successfully.",
        error: "",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error uploading user photo.",
        error: error.message || "Unknown error",
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
