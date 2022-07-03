import TextField from '@mui/material/TextField';

export default function PasswordInput() {
    return (
        <div>
            {/* 1.沒有focused版本 */}
            {/* <TextField id="password-basic" label="Password" variant="outlined" placeholder="Password"/> */}

            {/* 2.有focused版本 */}
            <TextField id="password-basic" label="Password" variant="outlined" placeholder="Password" focused
                sx={{
                    width: "335px",
                    height: "58px",
                    "& .MuiOutlinedInput-root": {
                        color: "#fff"
                    }
                }}
                inputProps={{
                    sx: {
                        "&::placeholder": {
                            color: "#fff"
                        }
                    }
                }} />
        </div>
    )
}
