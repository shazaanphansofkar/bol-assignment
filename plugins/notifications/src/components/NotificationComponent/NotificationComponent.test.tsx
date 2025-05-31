import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { NotificationComponent } from './NotificationComponent';
import { useNotification } from '../../providers/NotificationProvider';
import '@testing-library/jest-dom';


// Mock NotificationCard
jest.mock('../NotificationCard/NotificationCard', () => ({ notification, onClose }: any) => (
  <div data-testid="notification-card">
    <span>{notification.title}</span>
    <button onClick={onClose}>Close</button>
  </div>
));

// Mock useNotification context
jest.mock('../../providers/NotificationProvider', () => ({
  useNotification: jest.fn(),
}));

// Mock NotificationApi
const mockFetchUnread = jest.fn();
const mockMarkAsRead = jest.fn();

jest.mock('../../api/NotificationApi', () => ({
  NotificationApi: () => ({
    fetchUnread: mockFetchUnread,
    markAsRead: mockMarkAsRead,
  }),
}));

const mockNotifications = [
  { id: 1, title: 'New Jira Ticket', message: 'A new issue has been assigned', type: 'info', source: 'jira' },
  { id: 2, title: 'Pipeline Failed', message: 'GitLab pipeline failed', type: 'error', source: 'gitlab' },
];

describe('NotificationComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNotification as jest.Mock).mockReturnValue({ notifications: mockNotifications });
    mockFetchUnread.mockResolvedValue(mockNotifications);
  });

  it('renders without notifications', async () => {
    (useNotification as jest.Mock).mockReturnValue({ notifications: [] });
    mockFetchUnread.mockResolvedValue([]);

    render(<NotificationComponent />);
    await waitFor(() => {
      expect(screen.getByText('No new notifications.')).toBeInTheDocument();
    });
  });

  it('renders notification cards', async () => {
    render(<NotificationComponent />);
    await waitFor(() => {
      expect(screen.getAllByTestId('notification-card')).toHaveLength(2);
      expect(screen.getByText('New Jira Ticket')).toBeInTheDocument();
      expect(screen.getByText('Pipeline Failed')).toBeInTheDocument();
    });
  });

  it('clears notification on close', async () => {
    render(<NotificationComponent />);
    await waitFor(() => {
      expect(screen.getByText('New Jira Ticket')).toBeInTheDocument();
    });

    const closeButtons = screen.getAllByText('Close');
    fireEvent.click(closeButtons[0]);

    await waitFor(() => {
      expect(mockMarkAsRead).toHaveBeenCalledWith(1);
      // Since NotificationCard is mocked, we verify by testing card count change
      expect(screen.queryByText('New Jira Ticket')).not.toBeInTheDocument();
    });
  });
});
