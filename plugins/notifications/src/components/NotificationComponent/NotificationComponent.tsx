import { Typography } from "@material-ui/core";
import { Content } from "@backstage/core-components";
import { useNotification } from "../../providers/NotificationProvider";
import { NotificationApi } from "../../api/NotificationApi";
import { useEffect, useState } from "react";
import { NotificationCard } from "../NotificationCard";
import { NotiicationHeader } from "../NotiicationHeader";

export const NotificationComponent = () => {

  const { notifications } = useNotification();
  const [messages, setMessages] = useState([]);
  const notificationApi = NotificationApi();

  useEffect(() => {
    const load = async () => {
      const unread = await notificationApi.fetchUnread(1); //TODO: The userId can be fetched by identityApi
      setMessages(unread);
    };
    load();
  }, []);

  useEffect(() => {
    setMessages(notifications);
  }, [notifications]);

  const clearNotification = async (id: number) => {
    await notificationApi.markAsRead(id);
    setMessages(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      <NotiicationHeader title="Notifications">
      </NotiicationHeader>
      <Content >
        <div>
          {messages?.length === 0 && <Typography align="center">No new notifications.</Typography>}
          {messages?.map(n => (
            <NotificationCard notification={n} onClose={() => clearNotification(n.id)}></NotificationCard>
          ))}
        </div>
      </Content>
    </>
  );
};