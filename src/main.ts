import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI
  })

  const config = new DocumentBuilder()
  .setTitle('Landing generator API-GATEWAY')
  .setDescription('Handle the petitions of the landing generator project and connect the microserve that manage the restective information')
  .setVersion('1.0')
  .addTag('auth, users')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(envs.port);
  logger.log(`Api gateway running on port ${envs.port}`)
}
bootstrap();
