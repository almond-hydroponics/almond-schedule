// @formatter:off
import * as withPagination from 'sequelize-cursor-pagination';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
	modelName: 'schedule',
	tableName: 'schedules',
	underscored: true,
	timestamps: true,
	version: true,
})
export class Schedule extends Model<Schedule> {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV1,
		comment: 'The identifier for the schedule record.',
	})
	id: string;

	@Column({
		type: DataType.STRING,
		comment: 'The schedule string value.',
	})
	schedule: string;

	@Column({
		type: DataType.UUID,
		comment:
			'Ref: Device. The device for which the schedule is associated with.',
	})
	device: string;

	@Column({
		type: DataType.BOOLEAN,
		comment: 'The schedule active session.',
		defaultValue: false,
	})
	active: boolean;
}

withPagination({
	methodName: 'findAndPaginate',
	primaryKeyField: 'id',
})(Schedule);
