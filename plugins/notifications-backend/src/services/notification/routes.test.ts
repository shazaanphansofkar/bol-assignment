import express from 'express';
import request from 'supertest';
import { createRouter } from './router';
import { NotificationService } from './service';

jest.mock('./service', () => ({
    NotificationService: jest.fn(),
}));

describe('Notification Router', () => {
    const mockGetUnreadNotifications = jest.fn();
    const mockReadNotification = jest.fn();
    const mockCreateNotification = jest.fn();

    const logger = {
        info: jest.fn(),
    };

    let app: express.Express;

    beforeEach(async () => {
        (NotificationService as jest.Mock).mockReturnValue({
            getUnreadNotifications: mockGetUnreadNotifications,
            readNotification: mockReadNotification,
            createNotification: mockCreateNotification,
        });

        app = express();
        const router = await createRouter({ logger });
        app.use(router);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /unread returns unread notifications', async () => {
        const notifications = [{ id: 1, title: 'Hey', read: false }];
        mockGetUnreadNotifications.mockResolvedValue(notifications);

        const res = await request(app).get('/unread?userId=42');

        expect(mockGetUnreadNotifications).toHaveBeenCalledWith(42);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(notifications);
    });

    it('PUT /:id/read marks a notification as read', async () => {
        mockReadNotification.mockResolvedValue(undefined);

        const res = await request(app).put('/123/read');

        expect(mockReadNotification).toHaveBeenCalledWith(123);
        expect(res.status).toBe(204);
    });

    it('POST / creates a new notification', async () => {
        const newNotification = { id: 7, title: 'Hello', message: 'World', userId: 10 };
        mockCreateNotification.mockResolvedValue(newNotification);

        const res = await request(app)
            .post('/')
            .send({ title: 'Hello', message: 'World', userId: 10 })
            .set('Content-Type', 'application/json');

        expect(logger.info).toHaveBeenCalledWith('Calling post notification');
        expect(mockCreateNotification).toHaveBeenCalledWith('Hello', 'World', 10);
        expect(res.status).toBe(201);
        expect(res.body).toEqual(newNotification);
    });
});
