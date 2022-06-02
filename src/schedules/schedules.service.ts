import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { isEmpty } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { FindOptions } from 'sequelize/types';

import {
	IFindAndPaginateOptions,
	IFindAndPaginateResult,
} from '../commons/find-and-paginate.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.model';
import { ISchedulesService } from './schedules.interface';

@Injectable()
export class SchedulesService implements ISchedulesService {
	constructor(
		@Inject('SchedulesRepository') private readonly repo: typeof Schedule,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(SchedulesService.name);
	}

	async find(
		query?: IFindAndPaginateOptions,
	): Promise<IFindAndPaginateResult<Schedule>> {
		try {
			this.logger.info('SchedulesService#findAll.call %o', query);

			const result: IFindAndPaginateResult<Schedule> =
				// @ts-expect-error ignore error for now
				await this.repo.findAndPaginate({
					...query,
					raw: true,
					paranoid: false,
				});

			this.logger.info('SchedulesService#findAll.result %o', result);

			return result;
		} catch (e) {
			throw new BadRequestException();
		}
	}

	async findById(id: string): Promise<Schedule> {
		this.logger.info('SchedulesService#findById.call %o', id);

		const result: Schedule = await this.repo.findByPk(id, {
			raw: true,
		});

		this.logger.info('SchedulesService#findById.result %o', result);

		return result;
	}

	async findOne(query: FindOptions): Promise<Schedule> {
		this.logger.info('SchedulesService#findOne.call %o', query);

		const result: Schedule = await this.repo.findOne({
			...query,
			raw: true,
		});

		this.logger.info('SchedulesService#findOne.result %o', result);

		return result;
	}

	async count(query?: FindOptions): Promise<number> {
		this.logger.info('SchedulesService#count.call %o', query);

		const result: number = await this.repo.count(query);

		this.logger.info('SchedulesService#count.result %o', result);

		return result;
	}

	async create(schedule: ScheduleDto): Promise<Schedule> {
		this.logger.info('SchedulesService#create.call %o', schedule);

		const result: Schedule = await this.repo.create(schedule);

		this.logger.info('SchedulesService#create.result %o', result);

		return result;
	}

	async update(id: string, schedule: ScheduleDto): Promise<Schedule> {
		this.logger.info('SchedulesService#update.call %o', schedule);

		const record: Schedule = await this.repo.findByPk(id);

		if (isEmpty(record)) throw new Error('Record not found.');

		const result: Schedule = await record.update(schedule);

		this.logger.info('SchedulesService#update.result %o', result);

		return result;
	}

	async destroy(query?: FindOptions): Promise<number> {
		this.logger.info('SchedulesService#destroy.call %o', query);

		const result: number = await this.repo.destroy(query);

		this.logger.info('SchedulesService#destroy.result %o', result);

		return result;
	}
}
