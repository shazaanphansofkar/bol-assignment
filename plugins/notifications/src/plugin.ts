import {
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const notificationsPlugin = createPlugin({
  id: 'notifications',
  routes: {
    root: rootRouteRef,
  },
});

export const NotificationsPage = notificationsPlugin.provide(
  createRoutableExtension({
    name: 'NotificationsPage',
    component: () =>
      import('./components/NotificationComponent').then(m => m.NotificationComponent),
    mountPoint: rootRouteRef,
  }),
);

export const NotificationToast = notificationsPlugin.provide(
  createComponentExtension({
    name: 'NotificationToast',
    component: {
      lazy: () => import('./components/NotificationToast').then(m => m.NotificationToast),
    },
  }),
);
