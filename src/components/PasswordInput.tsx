import TextField from '@mui/material/TextField';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';

export default function PasswordInput() {

    const [inputFocus, setInputFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordPassRule, setPasswordPassRule] = useState({
        haveUppercase: false,
        haveLowercase: false,
        haveNumber: false,
        haveSpecialCharacter: false,
        longerThan8: false,
    });

    const onFocus = function () {
        console.log('onFocus');
        setInputFocus(true);
    }

    const onBlur = function () {
        console.log('onBlur');
        setInputFocus(false);
    }

    /** 密碼有變化 */
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('event.target.value', event.target.value);
        setPassword(event.target.value);
        verifyPassword(event.target.value);
    };

    /** 驗證密碼 */
    const verifyPassword = (password: string) => {
        let haveUppercase = password.match(/[A-Z]+/) ? true : false;
        let haveLowercase = password.match(/[a-z]+/) ? true : false;
        let haveNumber = password.match(/[0-9]+/) ? true : false;
        let haveSpecialCharacter = password.match(/[!@#$%*?&]+/) ? true : false;
        let longerThan8 = password.length >= 8 ? true : false;
        const rule = {
            haveUppercase: haveUppercase,
            haveLowercase: haveLowercase,
            haveNumber: haveNumber,
            haveSpecialCharacter: haveSpecialCharacter,
            longerThan8: longerThan8,
        }
        // console.log('rule', rule);
        setPasswordPassRule(rule);
    }

    /** 密碼輸入提示style */
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
                onBlur={onBlur}
                onChange={onPasswordChange} />

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
                color: "#fff",
                display: inputFocus ? "block" : "none"
            }}>

                <NoticeItemStyle>
                    {passwordPassRule.haveUppercase ? <CheckCircleIcon color="primary" /> : <CheckCircleOutlineIcon color="secondary" />}
                    <p>Have at least one uppercase letter</p>
                </NoticeItemStyle>
                <NoticeItemStyle>
                    {passwordPassRule.haveLowercase ? <CheckCircleIcon color="primary" /> : <CheckCircleOutlineIcon color="secondary" />}
                    <p>Have at least one lowercase letter</p>
                </NoticeItemStyle>
                <NoticeItemStyle>
                    {passwordPassRule.haveNumber ? <CheckCircleIcon color="primary" /> : <CheckCircleOutlineIcon color="secondary" />}
                    <p>Have at least one number</p>
                </NoticeItemStyle>
                <NoticeItemStyle>
                    {passwordPassRule.haveSpecialCharacter ? <CheckCircleIcon color="primary" /> : <CheckCircleOutlineIcon color="secondary" />}
                    <p>Have at least one special character<br />(!@#$...etc)</p>
                </NoticeItemStyle>
                <NoticeItemStyle>
                    {passwordPassRule.longerThan8 ? <CheckCircleIcon color="primary" /> : <CheckCircleOutlineIcon color="secondary" />}
                    <p>Longer than 8 characters</p>
                </NoticeItemStyle>
            </div>
        </div >
    )
}
