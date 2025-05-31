import { render, screen } from '@testing-library/react';
import { NotiicationHeader } from './NotificationHeader';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('NotiicationHeader', () => {
  it('renders the title correctly', () => {
    // set state
    const theme = createTheme();

    // action
    render(
      <ThemeProvider theme={theme}>
        <NotiicationHeader title="My Developer Portal" />
      </ThemeProvider>
    );

    // expectation
    expect(screen.getByText('My Developer Portal')).toBeInTheDocument();
  });
});