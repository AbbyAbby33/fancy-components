import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function PasswordInput() {

    const [inputFocus, setInputFocus] = useState(false);

    const onFocus = function () {
        console.log('onFocus');
        setInputFocus(true);
    }

    const onBlur = function () {
        console.log('onBlur');
        setInputFocus(false);
    }

    return (
        <div>
            {/* 1.沒有focused版本 */}
            {/* <TextField id="password-basic" label="Password" variant="outlined" placeholder="Password"/> */}

            {/* 2.有focused版本 */}
            <TextField id="password-basic" label="Password" variant="outlined" placeholder="Password" focused
                sx={{
                    width: "335px",
                    height: "58px",
                    // label color
                    "& label": {
                        color: "#fff",
                    },
                    // label color
                    "& .Mui-focused": {
                        color: "#fff !important",
                    },
                    "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        '&.Mui-focused fieldset': {
                            // borderColor: 'rgba(255, 255, 255, .5)',
                            borderColor: inputFocus ? '#00A3FF !important' : 'rgba(255, 255, 255, .5)'
                        },
                        '&:hover fieldset': {
                            borderColor: '#fff',
                        },
                    }
                }}
                inputProps={{
                    sx: {
                        "&::placeholder": {
                            color: "#fff"
                        }
                    }
                }}
                onFocus={onFocus}
                onBlur={onBlur} />
        </div>
    )
}
