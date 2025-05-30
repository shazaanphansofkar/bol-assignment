import { Box, Snackbar, SnackbarCloseReason, SnackbarContent, Typography } from "@material-ui/core";
import { useNotification } from "../../providers/NotificationProvider";

export const NotificationToast = ({ isVisible, setVisibility }: {
    isVisible: boolean,
    setVisibility: (value: boolean) => void
}) => {
    const { notifications, setNotifications } = useNotification();

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setVisibility(false);
    };

    return (
        <Snackbar
            open={isVisible}
            autoHideDuration={3000}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            onClose={handleClose}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', p: 2, bgcolor: '#676767', color: 'white'}}>
                <Typography variant="h5">Notification</Typography>
                <Typography>{`You have ${notifications?.length} unread notifications`}</Typography>
                {/* <Typography>{`${notifications.pop()?.title}`}</Typography>
                <Typography>{`${notifications.pop()?.message}`}</Typography> */}
            </Box>
        </Snackbar>
    )
}