import { discoveryApiRef, fetchApiRef, useApi } from "@backstage/core-plugin-api";

export const NotificationApi = () => {
    
    const discoveryApi = useApi(discoveryApiRef);
    const fetchApi = useApi(fetchApiRef);

    const fetchUnread = async (userId: number): Promise<Notification[]> => {
        const baseUrl = await discoveryApi.getBaseUrl('notifications'); 
        const res = await fetchApi.fetch(`${baseUrl}/unread?userId=${userId}`);
        return await res.json();
    };

    const markAsRead = async (id: number): Promise<void> => {
        const baseUrl = await discoveryApi.getBaseUrl('notifications'); 
        await fetchApi.fetch(`${baseUrl}/${id}/read`, { method: 'PUT' });
    };

    const listenForUpdates = (userId: number, callback: (notifications: Notification[]) => void) => {
        const ws = new WebSocket(`ws://localhost:7071/notifications/ws?userId=${userId}`);

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = event => {
            const data = JSON.parse(event.data);
            callback(data);
        };

        ws.onerror = err => {
            console.error('WebSocket error:', err);
        };

        return ws;
    };

    return {
        fetchUnread,
        markAsRead,
        listenForUpdates
    };
}