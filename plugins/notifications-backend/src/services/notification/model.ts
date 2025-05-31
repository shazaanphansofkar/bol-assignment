import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../db-config';
import { DiscoveryService, LoggerService } from '@backstage/backend-plugin-api';

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
        source: DataTypes.STRING,
        type: DataTypes.STRING,
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
    logger: LoggerService,
    discovery: DiscoveryService

}

export interface NotificationModel {
  id: number;
  userId: number;
  title: string;
  message: string;
  source: 'jira' | 'confluence' | 'gitlab' | 'custom';
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
};