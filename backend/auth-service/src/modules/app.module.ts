import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { AuthModule } from './auth/auth.module.js';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { defineConfig } from '@mikro-orm/postgresql';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // Не нужно будет импортировать в каждый модуль отдельно
			envFilePath: ['.env.local', '.env'],
		}),
		// Distributed tracing, auto-correlated logs, request/job metrics, error
		// telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
		// ObserveModule.forRoot({
		// 	appKey: 'YOUR_APP_KEY',
		// 	appSecret: 'YOUR_APP_SECRET',
		// 	serviceId: 'auth-service',
		// }),

		MikroOrmModule.forRootAsync({
			imports: [ ConfigModule ],
			useFactory: (configService: ConfigService) => {
				return defineConfig({
					metadataProvider: ReflectMetadataProvider,
					host: configService.get('PG_HOST'),
					port: configService.get('PG_PORT'),
					dbName: configService.get('PG_DATABASE'),
					user: configService.get('PG_USERNAME'),
					password: configService.get('PG_PASSWORD'),
					logger: (msg) => console.log(msg),
					debug: true,
					entities: ['dist/entities/*.js'],
					entitiesTs: ['src/entities/*.ts'], // все сущности
					discovery: {
						warnWhenNoEntities: false
					}
				});
			},
			inject: [ ConfigService ]
		}),

		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
