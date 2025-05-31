import { NotificationApi } from './NotificationApi';
import { discoveryApiRef, fetchApiRef, useApi } from '@backstage/core-plugin-api';

jest.mock('@backstage/core-plugin-api', () => ({
  fetchApiRef: {},
  discoveryApiRef: {},
  useApi: jest.fn(),
}));

const mockFetch = jest.fn();
const mockBaseUrlFn = jest.fn();

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
      getBaseUrl: mockBaseUrlFn
    });

    mockBaseUrlFn.mockReturnValue('http://localhost:7007/api/notifications');
  });

  it('fetchUnread - should fetch unread notifications', async () => {
    const mockResponse = [{ id: 1, message: 'Test notification' }];
    mockFetch.mockResolvedValue({
      json: async () => mockResponse,
    });


    const api = NotificationApi();
    const notifications = await api.fetchUnread(1);

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:7007/api/notifications/unread?userId=1');
    expect(notifications).toEqual(mockResponse);
  });

  it('markAsRead - should send PUT request to mark notification as read', async () => {
    mockFetch.mockResolvedValue({});

    const api = NotificationApi();
    await api.markAsRead(1);

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:7007/api/notifications/1/read', { method: 'PUT' });
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

    const socket = api.listenForUpdates(1, callback);

    expect(WebSocket).toHaveBeenCalledWith('ws://localhost:7071/notifications/ws?userId=1');

    const mockData = [{ id: 99, message: 'New' }];
    if (mockSocket.onmessage) {
      mockSocket.onmessage({ data: JSON.stringify(mockData) });
    }

    // Simulate message received
    (socket.onmessage as any)({ data: JSON.stringify(mockData) });
    expect(callback).toHaveBeenCalledWith(mockData);
  });
});
