import { Card, Typography, IconButton, Box } from '@mui/material';
import { SiJira, SiGitlab, SiConfluence } from 'react-icons/si';
import { Notifications, Close } from '@mui/icons-material';
import { Notification } from '../../api/types';

export const typeStyles = {
    info: {
        bg: '#e8f4fd',
        color: '#2196f3',
    },
    success: {
        bg: '#edf7ed',
        color: '#4caf50',
    },
    warning: {
        bg: '#fff8e1',
        color: '#ff9800',
    },
    error: {
        bg: '#fdecea',
        color: '#f44336',
    }
};

const sourceIcons = {
    jira: SiJira,
    gitlab: SiGitlab,
    confluence: SiConfluence
};

interface NotificationCardProps {
    notification: Notification,
    onClose: () => void
}

const NotificationCard = ({ notification, onClose }: NotificationCardProps) => {
    const style = typeStyles[notification.type] || typeStyles.info;

    const SourceIcon = sourceIcons[notification.source?.toLowerCase()] || Notifications;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: style.bg,
                borderLeft: `6px solid ${style.color}`,
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                my: 1,
            }}
        >
            <Box data-testid="source-icon" sx={{ color: style.color, mr: 2, fontSize: 24 }}>
                <SourceIcon size={24} />
            </Box>

            <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {notification.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {notification.message}
                </Typography>
            </Box>

            <IconButton size="small" onClick={onClose}>
                <Close fontSize="small" />
            </IconButton>
        </Card>
    );
};

export default NotificationCard;