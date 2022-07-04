import TextField from '@mui/material/TextField';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';

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

    const NoticeItemStyle = styled('div')(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        "& svg": {
            // background: "red",
            marginRight: "12px"
        }
    }));

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

            {/* 密碼提示 */}
            <div style={{
                boxSizing: "border-box",
                width: "335px",
                // height: "226px",
                background: "#242424",
                padding: "8px 12px",
                boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.3)",
                borderRadius: "8px",
                marginTop: "8px",
                color: "#fff"
            }}>
                <NoticeItemStyle>
                    <CheckCircleIcon color="primary"/>
                    {/* <CheckCircleOutlineIcon color="secondary"/> */}
                    <p>Have at least one uppercase letter</p>
                </NoticeItemStyle>
                <NoticeItemStyle>
                    {/* <CheckCircleIcon color="primary" /> */}
                    <CheckCircleOutlineIcon color="secondary"/>
                    <p>Have at least one lowercase letter</p>
                </NoticeItemStyle>
                <NoticeItemStyle>
                    {/* <CheckCircleIcon color="primary" /> */}
                    <CheckCircleOutlineIcon color="secondary"/>
                    <p>Have at least one number</p>
                </NoticeItemStyle>
                <NoticeItemStyle>
                    {/* <CheckCircleIcon color="primary" /> */}
                    <CheckCircleOutlineIcon color="secondary"/>
                    <p>Have at least one special character<br />(!@#$...etc)</p>
                </NoticeItemStyle>
                <NoticeItemStyle>
                    {/* <CheckCircleIcon color="primary" /> */}
                    <CheckCircleOutlineIcon color="secondary"/>
                    <p>Longer than 8 characters</p>
                </NoticeItemStyle>
            </div>
        </div >
    )
}
