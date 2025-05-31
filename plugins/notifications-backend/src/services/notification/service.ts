import { Notification, NotificationModel } from "./model";

export function NotificationService() {
    
    async function createNotification(notification: NotificationModel) {
        const newNotification = await Notification.create({
            ...notification,
            read: false,
            createdAt: new Date()
        });
        return newNotification;
    }

    async function getUnreadNotifications(userId: number) {
        return await Notification.findAll({ where: { userId: userId, read: false }, order:[['createdAt', 'DESC']] });
    }

    async function getNotifications() {
        const notifications = await Notification.findAll({order: ['createdAt', 'DESC']});
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