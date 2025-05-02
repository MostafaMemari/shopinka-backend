import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { Logger } from "@nestjs/common";
import { swaggerConfigInit } from "./configs/swagger.config";
import * as express from "express";

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

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  await app.listen(PORT, () => logger.log(`App running on port ${PORT}`));
  console.log(`http://localhost:${PORT}/swagger`);
}
bootstrap();
