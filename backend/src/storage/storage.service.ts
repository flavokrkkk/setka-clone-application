import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucketName: string;

  public constructor(private readonly configService: ConfigService) {
    this.bucketName = configService.getOrThrow<string>("YANDEX_BUCKET_NAME");
    this.s3Client = new S3Client({
      region: configService.getOrThrow<string>("YANDEX_REGION"),
      endpoint: configService.getOrThrow<string>("YANDEX_STORAGE_ENDPOINT"),
      credentials: {
        accessKeyId: configService.getOrThrow<string>("YANDEX_ACCESS_KEY"),
        secretAccessKey: configService.getOrThrow<string>("YANDEX_SECRET_KEY"),
      },
    });
  }

  public async uploadFile(userId: string, file: Express.Multer.File): Promise<string> {
    const key = `avatars/${userId}/${file.originalname}`;
    try {
      if (!file.mimetype.startsWith("image/")) {
        throw new Error("Допускаются только изображения");
      }
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      return `https://${this.bucketName}.storage.yandexcloud.net/${key}`;
    } catch (error) {
      throw new Error(`Ошибка при загрузке файла: ${error.message}`);
    }
  }

  public getDefaultAvatar(): string {
    return `https://storage.yandexcloud.net/${this.bucketName}/avatars/default-avatar.png`;
  }
}
