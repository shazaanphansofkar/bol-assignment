import express from 'express';
import { NotificationService } from './service';
import { RouteOptions } from './model';

export async function createRouter({
    logger
}: RouteOptions): Promise<express.Router> {
    const router = express.Router();
    const notificationService = NotificationService();

    router.use(express.json());

    router.get('/unread', async (req, res) => {
        const userId = req.query["userId"]
        res.json(await notificationService.getUnreadNotifications(Number(userId)));
    });

    router.put('/:id/read', async (req, res) => {
        const { id } = req.params;
        await notificationService.readNotification(Number(id));
        res.sendStatus(204);
    });

    router.post('/', async (req, res) => {
        logger.info('Calling post notification');
        const { title, message, userId } = req.body;
        const newNotification = await notificationService.createNotification(title, message, userId);
        res.status(201).json(newNotification);
    });

    return router;
}
