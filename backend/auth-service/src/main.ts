import 'reflect-metadata';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './modules/app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		instrument: ObserveInstrument,
	});

	app.enableVersioning({
		type: VersioningType.URI,
		prefix: 'v',
	});

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Fluent Way Auth API')
		.setDescription('Authentication service API')
		.setVersion(process.env.npm_package_version ?? '0.0.1')
		.build();
	SwaggerModule.setup('api', app, () => SwaggerModule.createDocument(app, swaggerConfig));

	const port = app.get(ConfigService).get("PORT") ?? 3000;
	await app.listen(port, ()=>{
		console.log(`Приложение запущено на порту: ${port}`);
	});
}
await bootstrap();
