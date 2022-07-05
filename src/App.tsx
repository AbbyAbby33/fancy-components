import './App.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// router & pages
import { NavLink, Route, Routes } from 'react-router-dom';
import PasswordPage from './pages/PasswordPage';
import CalendarPage from './pages/CalendarPage';

const theme = createTheme({
    // mode: 'dark', // 可以調暗色主題
    palette: {
        primary: {
            main: '#00D1FF',
        },
        secondary: {
            main: '#565656',
        },
        // info: {
        //     main: '',
        // },
        // warning: {
        //     main: '',
        // },
        // error: {
        //     main: '',
        // },
        // success: {
        //     main: '',
        // },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            {/* 1. 按鈕Bar */}
            <Box
                component="form"
                sx={{
                    backgroundColor: '#181818',
                    padding: '20px 40px',
                    borderBottom: '1px solid rgba(255, 255, 255, .3)',
                    background: 'rgba(255, 255, 255, .3)'
                }}
            >
                <Stack spacing={2} direction="row">
                    <NavLink to={`/passwordPage`}>
                        <Button variant="contained" size="small">Password</Button>
                    </NavLink>
                    <NavLink to={`/calendarPage`}>
                        <Button variant="contained" size="small">Calendar</Button>
                    </NavLink>
                </Stack>
            </Box>

            {/* 2. 路由 */}
            <Routes>
                <Route path="/" element={<PasswordPage />} />
                <Route path="passwordPage" element={<PasswordPage />} />
                <Route path="calendarPage" element={<CalendarPage />} />
                <Route path="*" element={<PasswordPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
