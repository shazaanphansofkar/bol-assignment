import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './notifications.sqlite'
});

export async function initializeDatabase() {
  await sequelize.sync(); // You can use { force: true } to reset
}