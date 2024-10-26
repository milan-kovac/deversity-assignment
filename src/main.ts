import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all.exceptions.filter';

async function bootstrap() {
  // App config
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger config
  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Launching the application
  await app.listen(process.env.PORT);

  const appUrl = await app.getUrl();
  Logger.debug(`🚀 Application is on: ${appUrl}`);
  Logger.debug(`🛸 Swagger is on: ${appUrl}/api`);
}
bootstrap();
