import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Calendar from './Calendar';
import { cloneDeep } from 'lodash';

interface DateObjInterface {
    id: string | null,
    /** 日期 */
    day: number | null,
    /** 樣式 */
    style: string | null,
    /** 毫秒 */
    time: number,
}

export default function BirthdayInput() {
    const [inputFocus, setInputFocus] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [date, setDate] = useState<Date | null>(new Date());
    const [dateView, setDateView] = useState('');

    const onFocus = function () {
        // console.log('onFocus');
        setInputFocus(true);
        setOpenCalendar(true);
    };

    const onBlur = function () {
        // console.log('onBlur');
        setInputFocus(false);
    };

    const onClickOk = function (dateObj: DateObjInterface) {
        // console.log('onClickOk------dateObj', dateObj);
        let dateTemp = new Date(dateObj.time);
        const month = dateTemp ? (dateTemp?.getMonth() + 1).toString().padStart(2, '0') : '';
        const day = dateTemp ? dateTemp?.getDate().toString().padStart(2, '0') : '';
        const year = dateTemp ? dateTemp?.getFullYear() : '';
        const date = '' + month + '/' + day + '/' + year;

        setDate(dateTemp);
        setDateView(date);
        setOpenCalendar(false);
    };

    const onClickCancel = function () {
        // console.log('onClickCancel');
        setOpenCalendar(false);
    };

    return (
        <div>
            <TextField
                id="password-basic"
                label="Birthday"
                variant="outlined"
                placeholder="mm/dd/yyyy"
                focused
                value={dateView}
                sx={{
                    width: '335px',
                    height: '58px',
                    marginBottom: '8px',
                    // label color
                    '& label': {
                        color: '#fff',
                    },
                    // label color
                    '& .Mui-focused': {
                        color: '#fff !important',
                    },
                    '& .MuiOutlinedInput-root': {
                        color: '#fff',
                        '&.Mui-focused fieldset': {
                            // borderColor: 'rgba(255, 255, 255, .5)',
                            borderColor: inputFocus
                                ? '#00A3FF !important'
                                : 'rgba(255, 255, 255, .5)',
                        },
                        '&:hover fieldset': {
                            borderColor: '#fff',
                        },
                    },
                }}
                inputProps={{
                    readOnly: true,
                    sx: {
                        '&::placeholder': {
                            color: '#fff',
                        },
                    },
                }}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            {/* 日曆選擇器 */}
            {openCalendar ?
                <Calendar targetDate={date} handleClickOk={onClickOk} handleClickCancel={onClickCancel} /> :
                ''
            }
        </div>
    )
}
