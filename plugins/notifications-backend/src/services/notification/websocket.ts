import { WebSocketServer } from 'ws';
import { NotificationService } from './service';
import { Notification } from '@internal/plugin-notifications/src/api/types';

export function setupWebSocketServer() {
  const wss = new WebSocketServer({ port: 7071, path: '/notifications/ws' });
  const notificationService = NotificationService();

  const wsConnections: {[key: string] : any} = {};

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = new URLSearchParams(url.search);
    const userId = params.get('userId');
    
    wsConnections[userId ?? 0] = ws;
    console.log(`Notification ws connected for user ${userId ?? 0}`);

    ws.on('message', async (data) => {
      const notification: Notification = JSON.parse(data.toString());
      const targetUser: number = notification.userId;
      await notificationService.createNotification(notification.title, notification.message, notification.userId);

      wsConnections[targetUser].send(JSON.stringify(await notificationService.getUnreadNotifications(targetUser)));
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
}
