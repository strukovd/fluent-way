import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { AuthModule } from './auth/auth.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // Не нужно будет импортировать в каждый модуль отдельно
		})
		// Distributed tracing, auto-correlated logs, request/job metrics, error
		// telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
		ObserveModule.forRoot({
			appKey: 'YOUR_APP_KEY',
			appSecret: 'YOUR_APP_SECRET',
			serviceId: 'auth-service',
		}),
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
