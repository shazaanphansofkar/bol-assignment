import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { NotificationComponent } from './NotificationComponent';
import { useNotification } from '../../providers/NotificationProvider';
import '@testing-library/jest-dom';


jest.mock('../../providers/NotificationProvider', () => ({
  useNotification: jest.fn(),
}));

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
    // set state
    (useNotification as jest.Mock).mockReturnValue({ notifications: [] });
    mockFetchUnread.mockResolvedValue([]);

    // action
    render(<NotificationComponent />);

    // expectation
    await waitFor(() => {
      expect(screen.getByText('No new notifications.')).toBeInTheDocument();
    });
  });

  it('renders notification cards', async () => {
    //action
    render(<NotificationComponent />);

    // expectation
    await waitFor(() => {
      expect(screen.getByText('New Jira Ticket')).toBeInTheDocument();
      expect(screen.getByText('Pipeline Failed')).toBeInTheDocument();
    });
  });

  it('clears notification on close', async () => {
    //set state
    render(<NotificationComponent />);


    await waitFor(() => {
      expect(screen.getByText('New Jira Ticket')).toBeInTheDocument();
    });

    // action
    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);

    // expectation
    await waitFor(() => {
      expect(mockMarkAsRead).toHaveBeenCalledWith(1);
      // Since NotificationCard is mocked, we verify by testing card count change
      expect(screen.queryByText('New Jira Ticket')).not.toBeInTheDocument();
    });
  });
});
