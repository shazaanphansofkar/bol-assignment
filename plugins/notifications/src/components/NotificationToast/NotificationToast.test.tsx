import { render, screen } from "@testing-library/react";
import { Notification } from "../../api/types";
import { NotificationToast } from "./NotificationToast";
import { useNotification } from "../../providers/NotificationProvider";
import { act } from "react";

jest.mock("../../providers/NotificationProvider", () => ({
    ...jest.requireActual("../../providers/NotificationProvider"),
    useNotification: jest.fn()
}));
jest.useFakeTimers();

const notification: Notification = {
    id: 1,
    title: 'Test alert',
    message: 'This is a test notification',
    read: false,
    userId: 1,
    createdAt: "30-05-2025"
}
const visilibityFn = jest.fn();

describe('NotificationToast', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays number of unread notifications', () => {
        // set state
        const notifcationContext = {
            notifications: [notification, notification],
            setNotifications: jest.fn()
        }

        jest.mocked(useNotification).mockImplementation(() => (notifcationContext))

        // action
        render(
                <NotificationToast isVisible={true} setVisibility={visilibityFn}></NotificationToast>
        );

        // expectation
        expect(screen.getByText(/You have 2 unread notifications/i)).toBeInTheDocument();
    });

    it('removes notification after 3 seconds', () => {
        // set state
        const notifcationContext = {
            notifications: [notification, notification],
            setNotifications: jest.fn()
        }

        jest.mocked(useNotification).mockImplementation(() => (notifcationContext));

        // action
        render(
                <NotificationToast isVisible={true} setVisibility={visilibityFn}></NotificationToast>
        );
        act(() => jest.advanceTimersByTime(4000));

        // expectation
        expect(visilibityFn).toHaveBeenCalled();
    });
});