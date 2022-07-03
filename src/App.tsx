import './App.css';
import Box from '@mui/material/Box';
import PasswordInput from './components/PasswordInput';

function App() {
    return (
        <div>
            <Box
                component="form"
                sx={{
                    p: 8,
                    backgroundColor: '#181818',
                }}
            >
                <PasswordInput />
            </Box>
        </div>
    );
}

export default App;
