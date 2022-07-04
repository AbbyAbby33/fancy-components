import './App.css';
import Box from '@mui/material/Box';
import PasswordInput from './components/PasswordInput';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

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
            <Box
                component="form"
                sx={{
                    backgroundColor: '#181818',
                    padding: '40px 40px 260px',
                }}
            >
                <PasswordInput />
            </Box>
        </ThemeProvider>
    );
}

export default App;
