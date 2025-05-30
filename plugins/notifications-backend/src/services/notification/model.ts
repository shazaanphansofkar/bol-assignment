import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../db-config';
import { LoggerService } from '@backstage/backend-plugin-api';

export const Notification = sequelize.define(
    'Notification',
    {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementIdentity: true,
            
        },
        userId: DataTypes.NUMBER,
        title: DataTypes.STRING,
        message:DataTypes.STRING,
        read:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type:DataTypes.DATE,
            defaultValue: new Date()
        }
    }
);

export interface RouteOptions {
    logger: LoggerService
}
