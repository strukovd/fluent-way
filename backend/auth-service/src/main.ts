import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './modules/app.module.js';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		instrument: ObserveInstrument,
	});
	app.enableVersioning({
		type: VersioningType.URI,
		prefix: 'v',
	});
	await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
