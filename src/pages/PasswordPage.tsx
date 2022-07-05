
import Box from '@mui/material/Box';
import PasswordInput from '../components/PasswordInput';

export default function PasswordPage() {
    return (
        <Box
            component="form"
            sx={{
                backgroundColor: '#181818',
                padding: '40px 40px 260px',
            }}
        >
            <PasswordInput />
        </Box>
    )
}
