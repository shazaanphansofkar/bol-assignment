import { NotificationService } from './service';
import { Notification, NotificationModel } from './model';

jest.mock('./model', () => ({
    Notification: {
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    },
}));

describe('NotificationService', () => {
    const service = NotificationService();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createNotification', () => {
        it('should create a new notification', async () => {
            // set state
            const mockNotification = { id: 1, title: 'Hello', message: 'World', userId: 1, read: false };
            (Notification.create as jest.Mock).mockResolvedValue(mockNotification);

            // action
            const result = await service.createNotification(mockNotification as NotificationModel);

            // expectation
            expect(Notification.create).toHaveBeenCalledWith(expect.objectContaining({
                title: 'Hello',
                message: 'World',
                userId: 1,
                read: false,
            }));
            expect(result).toBe(mockNotification);
        });
    });

    describe('getUnreadNotifications', () => {
        it('should return unread notifications for a user', async () => {
            // set state
            const mockData = [{ id: 1, read: false, userId: 1 }];
            (Notification.findAll as jest.Mock).mockResolvedValue(mockData);

            // action
            const result = await service.getUnreadNotifications(1);

            // expectation
            expect(Notification.findAll).toHaveBeenCalledWith({
                where: { userId: 1, read: false }
            });
            expect(result).toBe(mockData);
        });
    });

    describe('getNotifications', () => {
        it('should return all notifications', async () => {
            // set state
            const allNotifications = [{ id: 1 }, { id: 2 }];
            (Notification.findAll as jest.Mock).mockResolvedValue(allNotifications);

            // action
            const result = await service.getNotifications();

            // expectation
            expect(Notification.findAll).toHaveBeenCalled();
            expect(result).toBe(allNotifications);
        });
    });

    describe('readNotification', () => {
        it('should update notification as read', async () => {
            // set state
            (Notification.update as jest.Mock).mockResolvedValue([1]);
            
            // action
            await service.readNotification(1);

            // expectation
            expect(Notification.update).toHaveBeenCalledWith(
                { read: true },
                { where: { id: 1 } }
            );
        });
    });
});
