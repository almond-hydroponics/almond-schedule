import { FindOptions } from 'sequelize/types';

import {
	IFindAndPaginateOptions,
	IFindAndPaginateResult,
} from '../commons/find-and-paginate.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.model';

export interface ISchedulesService {
	find(
		query?: IFindAndPaginateOptions,
	): Promise<IFindAndPaginateResult<Schedule>>;

	findById(id: string): Promise<Schedule>;

	findOne(query?: FindOptions): Promise<Schedule>;

	count(query?: FindOptions): Promise<number>;

	create(user: ScheduleDto): Promise<Schedule>;

	update(id: string, schedule: ScheduleDto): Promise<Schedule>;

	destroy(query?: FindOptions): Promise<number>;
}
