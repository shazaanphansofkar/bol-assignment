import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { NotificationApi } from "../../api/NotificationApi";
import { NotificationToast } from "../../plugin";
import { Notification } from "../../api/types";

export class NotificationProps {
    horizontal: string = 'right';
    vertical: string = 'bottom';
    closeable: boolean
}

export interface NotificationContextModel {
    notifications: Notification[],
    setNotification: (notifications: Notification[]) => void
}

export const NotificationContext = createContext({});

export const useNotification = () : NotificationContextModel=> {
    const context = useContext(NotificationContext) as NotificationContextModel;
    if (context === undefined) {
        throw new Error('useNotification must be used within a Notification provider');
    }
    return context;
};

export interface ProviderProps {
    notificationProps: NotificationProps;
    children: ReactNode
}

export const NotificationProvider = ({ notificationProps, children }: ProviderProps) => {
    const [notifications, setNotifications] = useState([]);

    const notificationApi = NotificationApi();

    useEffect(() => {

        const ws = notificationApi.listenForUpdates(1, (notifications) => {
            console.log(notifications);
            setNotifications(notifications);
        });

        return () => ws.close();
    }, []);

    return (
        <NotificationContext.Provider value={{
            notifications,
            setNotifications
        }}>
            <NotificationToast props={notificationProps} />
            {children}
        </NotificationContext.Provider>
    );
}

