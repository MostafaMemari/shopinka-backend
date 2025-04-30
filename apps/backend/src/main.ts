import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { Logger } from "@nestjs/common";
import { swaggerConfigInit } from "./configs/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("NestApplication");

  const { PORT = 3000 } = process.env;

  app.setGlobalPrefix("/api/v1");

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  swaggerConfigInit(app);

  await app.listen(PORT, () => logger.log(`App running on port ${PORT}`));
}
bootstrap();
