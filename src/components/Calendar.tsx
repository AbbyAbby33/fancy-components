import { useState, useEffect } from 'react';
import './Calendar.scss';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export default function Calendar() {

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

    const [selectedDay, setSelectedDay] = useState(new Date());
    const [yearTitle, setYearTitle] = useState(0);
    const [monthTitle, setMonthTitle] = useState(0);
    const [dateList, setDateList] = useState<Array<any>>([]);

    // 初始化
    useEffect(() => {
        renderCalendar();
    }, [])

    /** 畫日曆 */
    const renderCalendar = function () {
        // reset
        setDateList([]);

        let today = new Date();
        // let today = new Date('2022-06-10');
        // 年分
        const year = today.getFullYear();
        setYearTitle(year);
        // 月份
        const month = today.getMonth() + 1;
        setMonthTitle(month);

        /** 這個月第一天 */
        let firstDay = new Date(year, (month - 1), 1);
        let current = firstDay;
        let newList: any[] = [];

        // 當月
        while (firstDay.getMonth() === current.getMonth()) {
            // console.log('current.getDate()', current.getDate());
            // renderDate();
            const day = {
                Obj: current,
                day: current.getDate(),
                style: 'this-month'
            };
            newList = [...newList, day];
            current = new Date(current.setDate(current.getDate() + 1)); // next
        }

        // 上個月
        let firstDayWeek = firstDay.getDay();
        current = firstDay;
        console.log('firstDayWeek', firstDayWeek, 'current', current);
        for (let i = firstDayWeek - 1; i > 0; i--) {
            current = new Date(current.getTime() - 86400000); // before
            const day = {
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
        console.log('lastDayWeek', lastDayWeek);

        for (let i = lastDayWeek + 1; i < 7; i++) {
            current = new Date(current.getTime() + 86400000); // before
            const day = {
                Obj: current,
                day: current.getDate(),
                style: 'next-month'
            };
            newList = [...newList, day];
            console.log('current', current);

        }

        setDateList(newList);
        console.log('selectedDay', selectedDay, 'firstDay', firstDay, 'current', current, 'dateList', dateList);
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
                <span className="date">Su</span>
                <span className="date">Mo</span>
                <span className="date">Tu</span>
                <span className="date">We</span>
                <span className="date">Th</span>
                <span className="date">Fr</span>
                <span className="date">Sa</span>
            </div>
            <div className="date-list">
                {dateList.map(v => {
                    return <span className={'date ' + v.style} key={uuidv4()}>{v.day}</span>
                })}
            </div>

            <Stack spacing={4} direction="row" justifyContent="flex-end">
                <CancelButton variant="text">Cancel</CancelButton>
                <Button variant="text">OK</Button>
            </Stack>
        </div>
    )
}
