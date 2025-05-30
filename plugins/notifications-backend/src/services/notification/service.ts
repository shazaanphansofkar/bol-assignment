import { Notification } from "./model";

export function NotificationService() {
    
    async function createNotification(title: string, message: string, userId: number) {
        const newNotification = await Notification.create({
            userId,
            title,
            message,
            read: false,
            createdAt: new Date(),
        });
        return newNotification;
    }

    async function getUnreadNotifications(userId: number) {
        return await Notification.findAll({ where: { userId: userId, read: false } });
    }

    async function getNotifications() {
        const notifications = await Notification.findAll();
        return notifications;
    }

    async function readNotification(id: number) {
        await Notification.update({ read: true }, { where: { id } });
    }

    return {
        createNotification,
        getUnreadNotifications,
        getNotifications,
        readNotification
    };
}