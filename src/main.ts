import * as fs from "fs";
import helmet from "helmet";
import { AppModule } from "src/app.module";
import * as compression from "compression";
import * as morgan from "morgan";
import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { GlobalErrorHandler } from "src/utils/all-exception-filter";
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";

const bootstrap = async () => {
  const app = await NestFactory.create<INestApplication>(AppModule);
  const port = process.env.PORT || 8989;

  app.enableCors({ credentials: true, origin: ["http://localhost:3000"] }); // Add other hosted urls
  app.setGlobalPrefix("api/v1");
  const config = new DocumentBuilder()
    .setTitle("SUNBYTES")
    .setDescription("Sunbytes Senior Backend Developer Task")
    .setVersion("1.0")
    .addBearerAuth()
    .addServer(`http://localhost:${port}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);
  fs.writeFileSync("./swagger-documentation.json", JSON.stringify(document));

  // GLOBAL MIDDLEWARES
  app.use(compression());
  app.use(helmet());
  app.use(morgan("dev"));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalErrorHandler());
  await app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
};

bootstrap();
