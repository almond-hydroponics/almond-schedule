import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { PinoLogger } from 'nestjs-pino';

import { ICount, IQuery } from '../commons/commons.interface';
import { IFindPayload } from '../commons/cursor-pagination.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.model';
import { ISchedulesService } from './schedules.interface';

@Controller()
export class SchedulesController {
	constructor(
		@Inject('SchedulesService')
		private readonly service: ISchedulesService,
		private readonly logger: PinoLogger,
	) {
		logger.setContext(SchedulesController.name);
	}

	@GrpcMethod('SchedulesService', 'find')
	async find(query: IQuery): Promise<IFindPayload<Schedule>> {
		this.logger.info('SchedulesController#findAll.call %o', query);

		const { edges, pageInfo, totalCount } = await this.service.find({
			attributes: !isEmpty(query.select)
				? ['id'].concat(query.select)
				: undefined,
			where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
			order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
			limit: !isNil(query.limit) ? query.limit : 25,
			before: !isEmpty(query.before) ? query.before : undefined,
			after: !isEmpty(query.after) ? query.after : undefined,
		});

		const result: IFindPayload<Schedule> = {
			totalCount,
			edges,
			pageInfo,
		};

		this.logger.info('SchedulesController#findAll.result %o', result);

		return result;
	}

	@GrpcMethod('SchedulesService', 'findById')
	async findById({ id }): Promise<Schedule> {
		this.logger.info('SchedulesController#findById.call %o', id);

		const result: Schedule = await this.service.findById(id);

		this.logger.info('SchedulesController#findById.result %o', result);

		if (isEmpty(result)) throw new Error('User record not found.');

		return result;
	}

	@GrpcMethod('SchedulesService', 'findOne')
	async findOne(query: IQuery): Promise<Schedule> {
		this.logger.info('SchedulesController#findOne.call %o', query);

		const result: Schedule = await this.service.findOne({
			attributes: !isEmpty(query.select) ? query.select : undefined,
			where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
		});

		this.logger.info('SchedulesController#findOne.result %o', result);

		if (isEmpty(result)) throw new Error('User record not found.');

		return result;
	}

	@GrpcMethod('SchedulesService', 'count')
	async count(query: IQuery): Promise<ICount> {
		this.logger.info('SchedulesController#count.call %o', query);

		const count: number = await this.service.count({
			where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
		});

		this.logger.info('SchedulesController#count.result %o', count);

		return { count };
	}

	@GrpcMethod('SchedulesService', 'create')
	async create(data: ScheduleDto): Promise<Schedule> {
		this.logger.info('SchedulesController#create.call %o', data);

		const result: Schedule = await this.service.create(data);

		this.logger.info('SchedulesController#create.result %o', result);

		return result;
	}

	@GrpcMethod('SchedulesService', 'update')
	async update({ id, data }): Promise<Schedule> {
		this.logger.info('SchedulesController#update.call %o %o', id, data);

		const result: Schedule = await this.service.update(id, data);

		this.logger.info('SchedulesController#update.result %o', result);

		return result;
	}

	@GrpcMethod('SchedulesService', 'destroy')
	async destroy(query: IQuery): Promise<ICount> {
		this.logger.info('SchedulesController#destroy.call %o', query);

		const count: number = await this.service.destroy({
			where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
		});

		this.logger.info('SchedulesController#destroy.result %o', count);

		return { count };
	}
}
