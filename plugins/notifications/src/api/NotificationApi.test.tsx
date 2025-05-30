import { NotificationApi } from './NotificationApi';
import { fetchApiRef, useApi } from '@backstage/core-plugin-api';

jest.mock('@backstage/core-plugin-api', () => ({
  fetchApiRef: {},
  useApi: jest.fn(),
}));

const mockFetch = jest.fn();

(global as any).WebSocket = jest.fn(() => ({
  addEventListener: jest.fn(),
  send: jest.fn(),
  close: jest.fn(),
  onopen: null,
  onmessage: null,
  onerror: null,
}));

describe('NotificationApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useApi as jest.Mock).mockReturnValue({
      fetch: mockFetch,
    });
  });

  it('fetchUnread - should fetch unread notifications', async () => {
    const mockResponse = [{ id: 1, message: 'Test notification' }];
    mockFetch.mockResolvedValue({
      json: async () => mockResponse,
    });

    const api = NotificationApi();
    const notifications = await api.fetchUnread(123);

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:7007/api/notifications/unread?userId=123');
    expect(notifications).toEqual(mockResponse);
  });

  it('markAsRead - should send PUT request to mark notification as read', async () => {
    mockFetch.mockResolvedValue({});

    const api = NotificationApi();
    await api.markAsRead(42);

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:7007/api/notifications/42/read', { method: 'PUT' });
  });

  it('listenForUpdates - should set up WebSocket and call callback on message', () => {
    const api = NotificationApi();
    const callback = jest.fn();
    const mockSocket = {
      onopen: null,
      onmessage: null,
      onerror: null,
    };

    (global as any).WebSocket = jest.fn(() => mockSocket);

    const socket = api.listenForUpdates(321, callback);

    expect(WebSocket).toHaveBeenCalledWith('ws://localhost:7071/notifications/ws?userId=321');

    const mockData = [{ id: 99, message: 'New' }];
    if (mockSocket.onmessage) {
      mockSocket.onmessage({ data: JSON.stringify(mockData) });
    }

    // Simulate message received
    (socket.onmessage as any)({ data: JSON.stringify(mockData) });
    expect(callback).toHaveBeenCalledWith(mockData);
  });
});
