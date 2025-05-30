import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { NotificationApi } from "../../api/NotificationApi";
import { NotificationToast } from "../../plugin";

export const NotificationContext = createContext({});

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a Notification provider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState([]);
    const [visilibity, setVisibility] = useState(false);

    const notificationApi = NotificationApi();


    useEffect(() => {
        const load = async () => {
            const unread = await notificationApi.fetchUnread(1);
            setNotifications(unread);
        };
        load();

        const ws = notificationApi.listenForUpdates(1, (notifications) => {
            console.log(notifications);
            setNotifications(notifications);
            setVisibility(true);
        });

        return () => ws.close();
    }, []);

    return (
        <NotificationContext.Provider value={{
            notifications,
            setNotifications
        }}>
            <NotificationToast isVisible={visilibity} setVisibility={setVisibility} />
            {children}
        </NotificationContext.Provider>
    );
}

