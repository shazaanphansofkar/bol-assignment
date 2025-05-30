import { NotificationComponent } from "./NotificationComponent";
import { useNotification } from "../../providers/NotificationProvider";
import { Notification } from "../../api/types";
import { fireEvent, getAllByText, getByText, render, screen } from "@testing-library/react";
import { NotificationApi } from "../../api/NotificationApi";

// const markAsReadFn = jest.fn();

jest.mock("../../providers/NotificationProvider", () => ({
    useNotification: jest.fn()
}));

jest.mock('../../api/NotificationApi', () => ({
  NotificationApi: jest.fn(),
}));

const notification: Notification = {
    id: 1,
    title: 'Test alert',
    message: 'This is a test notification',
    read: false,
    userId: 1,
    createdAt: "30-05-2025"
}

describe('NotificationComponent', () => {
    const markAsRead = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('list notifications', () => {

        const notifcationContext = {
            notifications: [notification, { ...notification, id: 2 }],
            setNotifications: jest.fn()
        };

        // set state
        jest.mocked(useNotification).mockImplementation(() => notifcationContext);

        // action
        render(
            <NotificationComponent></NotificationComponent>
        );

        // expectation
        expect(screen.getAllByText(notification.title).length).toEqual(2);
    });

    it('shows empty list', () => {

        const notifcationContext = {
            notifications: [],
            setNotifications: jest.fn()
        };

        // set state
        jest.mocked(useNotification).mockImplementation(() => notifcationContext);

        // action
        render(
            <NotificationComponent></NotificationComponent>
        );

        // expectation
        expect(screen.getByText(/No new notifications/i)).toBeInTheDocument();


    });

    it('marks notification as read', () => {
        (NotificationApi as jest.Mock).mockReturnValue({
                    markAsRead: markAsRead,
                });

        const setNotificationsFn = jest.fn();

        const notifcationContext = {
            notifications: [notification],
            setNotifications: setNotificationsFn
        };

        // set state
        jest.mocked(useNotification).mockImplementation(() => notifcationContext);

        // action
        render(
            <NotificationComponent></NotificationComponent>
        );

        // expectation
        expect(screen.getByText(notification.title)).toBeInTheDocument();
        const btn = screen.getByRole('button');
        fireEvent.click(btn);

        // expectation
        expect(jest.mocked(markAsRead)).toHaveBeenCalledWith(notification.id);
    });
});