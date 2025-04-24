import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(bootstrap.name)

  app.listen(3000 , () => console.log("Server running on port 3000"))
}
bootstrap();
