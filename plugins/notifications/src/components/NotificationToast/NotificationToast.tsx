import { Box, Snackbar, SnackbarCloseReason, SnackbarContent, Typography } from "@material-ui/core";
import { useNotification } from "../../providers/NotificationProvider";
import { NotificationProps } from "../../providers/NotificationProvider/NotificationProvider";
import { Toaster, toast } from 'sonner'
import { useEffect } from "react";

interface ToastProps {
    props: NotificationProps
}

export const NotificationToast = ({ props }: ToastProps) => {
    const { notifications } = useNotification();

    useEffect(() => {
        if(notifications && notifications.length > 0) {
            const notification = notifications[0];
            toast(`You have a notification from ${notification.source}`, {
                description: `${notification.title} | ${notification.message}`,
                position: `${props.vertical}-${props.horizontal}` as any
            });
        }
    }, [notifications])


    return (
        <Toaster closeButton={props.closeable} />
    );
}