import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './services/notification/router';
import { initializeDatabase } from './db-config';
import { setupWebSocketServer } from './services/notification/websocket';

/**
 * notificationsPlugin backend plugin
 *
 * @public
 */
export const notificationsPlugin = createBackendPlugin({
  pluginId: 'notifications',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
      },
      async init({ logger, httpRouter }) {
        await initializeDatabase(); // Sequelize sync

        httpRouter.use(await createRouter({
          logger
        }));

        setupWebSocketServer();
        
      },
    });
  },
});
