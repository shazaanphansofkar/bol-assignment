export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  source: 'jira' | 'confluence' | 'gitlab' | 'custom';
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
};