import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './modules/app.module.js';

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

	await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
