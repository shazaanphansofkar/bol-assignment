import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

interface NotiicationHeaderProps {
    title: string;
}

export const NotiicationHeader: React.FC<NotiicationHeaderProps> = ({ title }) => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#368164',
                boxShadow: 1,
                p: 2,
            }}
        >
            <Toolbar>
                <Typography
                    variant="h3"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
