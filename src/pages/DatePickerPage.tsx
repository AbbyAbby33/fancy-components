import Box from '@mui/material/Box';
import BirthdayInput from "../components/BirthdayInput";

export default function DatePickerPage() {
    return (
        <Box
            component="form"
            sx={{
                backgroundColor: '#181818',
                padding: '40px 40px 260px',
            }}
        >
            <BirthdayInput />
        </Box>
    )
}
