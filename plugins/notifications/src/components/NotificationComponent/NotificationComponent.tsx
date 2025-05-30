import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import { Content, Header, Page } from "@backstage/core-components";
import { useNotification } from "../../providers/NotificationProvider";
import { NotificationApi } from "../../api/NotificationApi";

export const NotificationComponent = () => {

  const { notifications, setNotifications } = useNotification();
  const notificationApi = NotificationApi();

  const clearNotification = async (id: number) => {
    await notificationApi.markAsRead(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      <Content >
        <div>
          {notifications.length === 0 && <Typography align="center">No new notifications.</Typography>}
          {notifications.map(n => (
            <Card key={n.id} style={{ marginBottom: '1rem' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="h6">{n.title}</Typography>
                    <Typography variant="body2">{n.message}</Typography>
                  </div>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption">{new Date(n.createdAt).toLocaleString()}</Typography>
                    <Button variant="contained" onClick={() => clearNotification(n.id)} style={{ marginTop: '0.5rem' }}>
                      Mark as read
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      </Content>
    </>
  );
};