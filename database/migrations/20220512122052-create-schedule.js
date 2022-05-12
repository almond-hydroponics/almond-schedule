// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('schedules', {
			id: {
				type: DataTypes.UUID,
				field: 'id',
				primaryKey: true,
				allowNull: false,
			},
			schedule: {
				type: DataTypes.STRING,
				field: 'name',
				allowNull: false,
			},
			device: {
				type: DataTypes.STRING,
				field: 'user',
				allowNull: false,
			},
			active: {
				type: DataTypes.BOOLEAN,
				field: 'active',
			},
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
			},
			version: {
				type: DataTypes.INTEGER,
				field: 'version',
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('schedules');
	},
};
