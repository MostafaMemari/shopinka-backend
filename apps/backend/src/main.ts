import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("NestApplication");

  const { PORT = 3000 } = process.env;

  await app.listen(PORT, () => logger.log(`App running on port ${PORT}`));
}
bootstrap();
