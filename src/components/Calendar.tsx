import { useState, useEffect } from 'react';
import './Calendar.scss';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

interface CalendarInterface {
    targetDate?: Date;
}

interface DateObjInterface {
    id: string | null,
    Obj: Date | null,
    day: number | null,
    style: string | null
}

export default function Calendar(props: CalendarInterface) {

    const monthDisplayList = [
        { s: 'Jan', l: 'January' },
        { s: 'Feb', l: 'February' },
        { s: 'Mar', l: 'March' },
        { s: 'Apr', l: 'April' },
        { s: 'May', l: 'May' },
        { s: 'Jun', l: 'Jun' },
        { s: 'Jul', l: 'July' },
        { s: 'Aug', l: 'August' },
        { s: 'Sept', l: 'September' },
        { s: 'Oct', l: 'October' },
        { s: 'Nov', l: 'November' },
        { s: 'Dec', l: 'December' }
    ];

    const { targetDate } = props;

    const [selectedDayObj, setSelectedDayObj] = useState<DateObjInterface>({
        id: null,
        Obj: null,
        day: null,
        style: null
    });
    const [yearTitle, setYearTitle] = useState(0);
    const [monthTitle, setMonthTitle] = useState(0);
    const [dateList, setDateList] = useState<Array<any>>([]);

    // 初始化
    useEffect(() => {
        let date = targetDate ? targetDate : new Date();
        date = new Date(date.setDate(date.getDate())); // 清空時分秒
        renderCalendar(date, true);
    }, [])

    /** 畫日曆 */
    const renderCalendar = function (initDay: Date, firstTimeFlag: boolean) {
        // reset
        setDateList([]);

        // 年分
        const year = initDay.getFullYear();
        setYearTitle(year);
        // 月份
        const month = initDay.getMonth() + 1;
        setMonthTitle(month);

        /** 這個月第一天 */
        let firstDay = new Date(year, (month - 1), 1);
        let current = firstDay;
        let newList: any[] = [];

        // 當月
        while (firstDay.getMonth() === current.getMonth()) {
            const day = {
                id: uuidv4(),
                Obj: current,
                day: current.getDate(),
                style: 'this-month'
            };
            // 初次渲染元件要處理顯示藍色
            if (firstTimeFlag) {
                if (current.getDate() === initDay.getDate()) {
                    setSelectedDayObj(day);
                }
            }
            newList = [...newList, day];
            current = new Date(current.setDate(current.getDate() + 1)); // next
        }

        // 上個月
        let firstDayWeek = firstDay.getDay();
        current = firstDay;
        // console.log('firstDayWeek', firstDayWeek, 'current', current);
        for (let i = firstDayWeek - 1; i > 0; i--) {
            current = new Date(current.getTime() - 86400000); // before
            const day = {
                id: uuidv4(),
                Obj: new Date(current.getTime() - 86400000),
                day: new Date(current.getTime() - 86400000).getDate(),
                style: 'last-month'
            };
            newList = [day, ...newList];
        }

        // 下個月
        const lastDay = new Date(year, (month - 1), newList[newList.length - 1].day);
        let lastDayWeek = lastDay.getDay();
        current = lastDay;
        // console.log('lastDayWeek', lastDayWeek);

        for (let i = lastDayWeek + 1; i < 7; i++) {
            current = new Date(current.getTime() + 86400000); // before
            const day = {
                id: uuidv4(),
                Obj: current,
                day: current.getDate(),
                style: 'next-month'
            };
            newList = [...newList, day];
            // console.log('current', current);
        }

        setDateList(newList);
        // console.log('selectedDayObj', selectedDayObj, 'firstDay', firstDay, 'current', current, 'dateList', dateList);
    }

    /** 點擊日期 */
    // TODO: 補dateObj型別
    const onDateClick = function (event: React.MouseEvent<HTMLElement>, dateObj: any) {
        // console.log('dateObj', dateObj);
        setSelectedDayObj(dateObj);
    }

    const CancelButton = styled(Button)({});

    return (
        <div className="fc-calendar">
            <p>Text</p>
            <div className="year-title">{monthTitle ? monthDisplayList[monthTitle - 1].s : ''},&nbsp;{yearTitle}</div>
            <div className="month-title">
                <span>{'<'}</span>
                <span>{monthTitle ? monthDisplayList[monthTitle - 1].l : ''}&nbsp;&nbsp;{yearTitle}</span>
                <span>{'>'}</span>
            </div>
            <div className="date-list">
                <span className="week">Su</span>
                <span className="week">Mo</span>
                <span className="week">Tu</span>
                <span className="week">We</span>
                <span className="week">Th</span>
                <span className="week">Fr</span>
                <span className="week">Sa</span>
            </div>
            <div className="date-list">
                {dateList.map(v => {
                    return (
                        <span className={'date ' + v.style + ' ' + (v.id === selectedDayObj.id ? 'selected-date' : '')} key={v.id}
                            onClick={(event: React.MouseEvent<HTMLElement>) => onDateClick(event, v)}>
                            {v.day}
                        </span>
                    )
                })}
            </div>

            <Stack spacing={4} direction="row" justifyContent="flex-end">
                <CancelButton variant="text">Cancel</CancelButton>
                <Button variant="text">OK</Button>
            </Stack>
        </div>
    )
}
