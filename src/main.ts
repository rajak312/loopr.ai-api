import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const isServerless = process.env.VERCEL === 'true';

  if (isServerless) {
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await app.init();
    return server;
  } else {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  }
}

bootstrap().then((server) => {
  if (server) {
    module.exports = server;
  }
});
