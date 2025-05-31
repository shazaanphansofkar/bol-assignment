import { Notification } from "../../api/types";
import { NotificationCard, typeStyles } from "./NotificationCard";
import { fireEvent, render, screen } from "@testing-library/react";

describe('NotificationCard', () => {

    const notification: Notification = {
        title: 'Test Title',
        message: 'Test Message',
        type: 'info',
        source: 'jira',
    } as Notification;

    it('shows card with title and message', () => {
        // set state

        // action
        render(<NotificationCard notification={notification} onClose={() => { }} />)
        // expectation
        expect(screen.getByText(notification.title)).toBeInTheDocument();
        expect(screen.getByText(notification.message)).toBeInTheDocument();
    });

    it('shows icon based on source', () => {
        // set state

        // action
        render(<NotificationCard notification={notification} onClose={() => { }} />)
        // expectation

        const icon = screen.getByTestId('source-icon');
        expect(icon).toBeInTheDocument();
    });

    it('shows default info icon if no source is provided', () => {
         // set state
         const notificationUnknownSource = {...notification, source: null};

        // action
        render(<NotificationCard notification={notificationUnknownSource} onClose={() => { }} />)
        // expectation

        const icon = screen.getByTestId('source-icon');
        expect(icon).toBeInTheDocument();
    });


    it('sets color based on type', () => {
        // set state

        // action
        const {container} = render(<NotificationCard notification={notification} onClose={() => { }} />)

        // expectation
        expect(container.firstChild).toHaveStyle(`backgroundColor: ${typeStyles[notification.type]}`);
    });

    it('sets default color for no type', () => {
        // set state
        const notificationUnknownSource = {...notification, type: null};

        // action
        const {container} = render(<NotificationCard notification={notification} onClose={() => { }} />)

        // expectation
        expect(container.firstChild).toHaveStyle(`backgroundColor: ${typeStyles['info']}`);
    });

    it('calls onclose on clicking close icon', () => {
        // set state
        const onCLoseMock = jest.fn();

        // action
        render(<NotificationCard notification={notification} onClose={onCLoseMock} />)
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // expectation
        expect(onCLoseMock).toHaveBeenCalled(); 
    });
});