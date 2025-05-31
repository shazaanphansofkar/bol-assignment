import { render, screen, waitFor } from "@testing-library/react";
import { Notification } from "../../api/types";
import { NotificationToast } from "./NotificationToast";
import { useNotification } from "../../providers/NotificationProvider";
import { act } from "react";
import { NotificationProps } from "../../providers/NotificationProvider/NotificationProvider";
import { toast } from "sonner";

jest.mock("../../providers/NotificationProvider", () => ({
    useNotification: jest.fn()
}));

jest.mock('sonner', () => ({
  toast: jest.fn(),
  Toaster: () => <div data-testid="toaster" />,
}));

describe('NotificationToast', () => {
  const mockNotification: Notification = {
    title: 'Test Title',
    message: 'Test Message',
    source: 'jira',
  } as Notification;

  const mockProps = {
    vertical: 'top',
    horizontal: 'right',
    closeable: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls toast when notifications are present', async () => {
    jest.mocked(useNotification).mockReturnValue({
      notifications: [mockNotification],
      setNotification: jest.fn()
    });

    render(<NotificationToast props={mockProps} />);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        `You have a notification from ${mockNotification.source}`,
        expect.objectContaining({
          description: `${mockNotification.title} | ${mockNotification.message}`,
          position: 'top-right',
        })
      );
    });
  });


  it('does not call toast when no notifications are present', async () => {
    jest.mocked(useNotification).mockReturnValue({
      notifications: [],
      setNotification: jest.fn()
    });

    render(<NotificationToast props={mockProps} />);

    await waitFor(() => {
      expect(toast).not.toHaveBeenCalled();
    });
  });
});