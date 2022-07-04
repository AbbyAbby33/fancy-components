import './App.css';
import Box from '@mui/material/Box';
import PasswordInput from './components/PasswordInput';

function App() {
    return (
        <div>
            <Box
                component="form"
                sx={{
                    backgroundColor: '#181818',
                    padding: '40px 40px 260px',
                }}
            >
                <PasswordInput />
            </Box>
        </div>
    );
}

export default App;
