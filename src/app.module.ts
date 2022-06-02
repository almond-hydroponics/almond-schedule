import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';

import { DatabaseModule } from './database/database.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				pinoHttp: {
					safe: true,
					transport:
						configService.get<string>('NODE_ENV') !== 'production'
							? {
									target: 'pino-pretty',
									options: {
										colorize: true,
									},
							  }
							: undefined,
					useLevelLabels: true,
				},
			}),
			inject: [ConfigService],
		}),
		DatabaseModule,
		SchedulesModule,
		ScheduleModule.forRoot(),
	],
})
export class AppModule {}
