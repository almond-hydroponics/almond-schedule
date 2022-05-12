import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { Schedule } from './schedule.model';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
	imports: [LoggerModule],
	providers: [
		{ provide: 'SchedulesService', useClass: SchedulesService },
		{ provide: 'SchedulesRepository', useValue: Schedule },
	],
	controllers: [SchedulesController],
})
export class SchedulesModule {}
