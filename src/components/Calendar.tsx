import { useState, useEffect } from 'react';
import './Calendar.scss';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { cloneDeep } from 'lodash';
interface CalendarInterface {
    /** 選取日期 */
    targetDate?: Date;
}

interface DateObjInterface {
    id: string | null,
    /** JS Date物件 */
    Obj: Date | null,
    /** 日期 */
    day: number | null,
    /** 樣式 */
    style: string | null,
    /** 毫秒 */
    time: number | null,
}

export default function Calendar(props: CalendarInterface) {

    const monthDisplayList = [
        { s: 'Jan', l: 'January' },
        { s: 'Feb', l: 'February' },
        { s: 'Mar', l: 'March' },
        { s: 'Apr', l: 'April' },
        { s: 'May', l: 'May' },
        { s: 'Jun', l: 'June' },
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
        style: null,
        time: null
    });
    const [preSelectedDayObj, setPreSelectedDayObj] = useState<DateObjInterface>({
        id: null,
        Obj: null,
        day: null,
        style: null,
        time: null
    });
    const [yearTitle, setYearTitle] = useState(0);
    const [monthTitle, setMonthTitle] = useState<number | null>(0);
    const [dateList, setDateList] = useState<Array<any>>([]);
    const [showPageDate, setShowPageDate] = useState<Date | null>(null);

    //
    const [showDateList, setShowDateList] = useState<boolean>(true); // true: 顯示日期列表 false: 顯示年份列表
    const [showPageYear, setShowPageYear] = useState<number>(new Date().getFullYear());
    const [yearList, setYearList] = useState<Array<number>>([]);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

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
        let current = cloneDeep(firstDay);
        let newList: any[] = [];
        // 當月
        while (firstDay.getMonth() === current.getMonth()) {
            const day = {
                id: uuidv4(),
                Obj: current,
                day: current.getDate(),
                style: 'this-month',
                time: current.getTime(),
            };
            let temp = cloneDeep(day);
            if (firstTimeFlag) {
                // 初次渲染元件 1.要處理顯示藍色 2.紀錄當前顯示頁面
                if (current.getDate() === initDay.getDate()) {
                    setSelectedDayObj(temp);
                    setShowPageDate(temp.Obj);
                }
            } else {
                // 不是第一次渲染，會發生在切換上下月，要顯示被選中的及前次選中的
                if (current.getTime() === selectedDayObj?.time) {
                    setSelectedDayObj(temp);
                }
                if (current.getTime() === preSelectedDayObj?.time) {
                    setPreSelectedDayObj(temp);
                }
            }
            newList = [...newList, day];
            current = new Date(current.setDate(current.getDate() + 1)); // next
        }

        // 上個月
        let firstDayWeek = firstDay.getDay();
        current = cloneDeep(firstDay);
        // console.log('firstDayWeek', firstDayWeek, 'current', current);
        for (let i = firstDayWeek - 1; i >= 0; i--) {
            current = new Date(current.getTime() - 86400000); // before
            const day = {
                id: uuidv4(),
                Obj: current,
                day: current.getDate(),
                style: 'last-month',
                time: current.getTime(),
            };
            newList = [day, ...newList];
        }

        // 下個月
        const lastDay = new Date(year, (month - 1), newList[newList.length - 1].day);
        let lastDayWeek = lastDay.getDay();
        current = lastDay;

        for (let i = lastDayWeek + 1; i < 7; i++) {
            current = new Date(current.getTime() + 86400000); // before
            const day = {
                id: uuidv4(),
                Obj: current,
                day: current.getDate(),
                style: 'next-month',
                time: current.getTime(),
            };
            newList = [...newList, day];
        }

        let temp = cloneDeep(newList);
        setDateList(temp);
        // console.log('selectedDayObj', selectedDayObj, 'firstDay', firstDay, 'current', current, 'newList', newList);
    }

    /** 點擊日期 */
    // TODO: 補dateObj型別
    const onDateClick = function (event: React.MouseEvent<HTMLElement>, dateObj: any) {
        let preTemp = cloneDeep(selectedDayObj);
        let selectedTemp = cloneDeep(dateObj);
        setPreSelectedDayObj(preTemp);
        setSelectedDayObj(selectedTemp);
        // console.log('onDateClick-------dateObj', dateObj, 'preTemp', preTemp, 'selectedTemp', selectedTemp);
    }

    /** 點擊上個月時 */
    const goLastMonth = function () {
        if (showPageDate) {
            let dateTemp = cloneDeep(showPageDate);
            dateTemp = new Date(dateTemp.setMonth(dateTemp.getMonth() - 1)); // 清空時分秒
            setShowPageDate(dateTemp);
            renderCalendar(dateTemp, false);
            // console.log('showPageDate', showPageDate, 'selectedDayObj', selectedDayObj);
        }
    }

    /** 點擊下個月時 */
    const goNextMonth = function () {
        if (showPageDate) {
            let dateTemp = cloneDeep(showPageDate);
            dateTemp = new Date(dateTemp.setMonth(dateTemp.getMonth() + 1)); // 清空時分秒
            setShowPageDate(dateTemp);
            renderCalendar(dateTemp, false);
            // console.log('showPageDate', showPageDate, 'selectedDayObj', selectedDayObj);
        }
    }

    const goYearList = function () {
        setShowPageYear(yearTitle);
        getYearList(yearTitle);
        setShowDateList(false);
    }

    /**
     * 取得年度列表
     * @param thisYear 目前年度
     *  */
    const getYearList = function (year: number) {
        // 計算起始值
        const remainder = year % 20;
        let start = year - remainder + 1;
        // 讓年度最小從1開始
        let current = start < 1 ? 1 : start;
        // 年度列表
        let yearList = [];
        for (let i = 0; i < 20; i++) {
            yearList.push(current);
            current += 1;
        }
        let temp = cloneDeep(yearList);
        setYearList(temp);
        // console.log('remainder', remainder, 'start', start, 'yearList', yearList);
    };

    const goLastYeatList = function () {
        const year = showPageYear - 20;
        setShowPageYear(year);
        getYearList(year);
    };

    const goNextYeatList = function () {
        const year = showPageYear + 20;
        setShowPageYear(year);
        getYearList(year);
    };

    /** 點擊年分 */
    const onClickYear = function (year: number) {
        if (showPageDate) {
            let dateTemp = cloneDeep(showPageDate);
            dateTemp = new Date(dateTemp.setFullYear(year));
            setShowPageDate(dateTemp);
            setSelectedYear(year);
            renderCalendar(dateTemp, false);
            setShowDateList(true);
            // console.log('showPageDate', showPageDate, 'selectedDayObj', selectedDayObj);
        }
    };

    const CancelButton = styled(Button)({});

    return (
        <div className="fc-calendar">
            <p>Text</p>
            <div className="year-title">{monthTitle ? monthDisplayList[monthTitle - 1].s : ''},&nbsp;{yearTitle}</div>
            {showDateList ?
                // 日期
                <div className="sub-title">
                    <span className="go-last-btn" onClick={goLastMonth}>{'<'}</span>
                    <span className="go-year-btn" onClick={goYearList}>{monthTitle ? monthDisplayList[monthTitle - 1].l : ''}&nbsp;&nbsp;{yearTitle}</span>
                    <span className="go-next-btn" onClick={goNextMonth}>{'>'}</span>
                </div> :
                // 年分
                <div className="sub-title">
                    <span className="go-last-btn" onClick={goLastYeatList}>{'<'}</span>
                    <span className="go-date-btn">{yearTitle}</span>
                    <span className="go-next-btn" onClick={goNextYeatList}>{'>'}</span>
                </div>
            }
            {showDateList ?
                // 日期列表
                <div>
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
                                <span className={'date ' + v.style + ' ' + (v.id === selectedDayObj.id ? 'selected-date' : '') + ' ' +
                                    (v.id === preSelectedDayObj.id ? 'pre-selected-date' : '')}
                                    key={v.id}
                                    onClick={(event: React.MouseEvent<HTMLElement>) => onDateClick(event, v)}>
                                    {v.day}
                                </span>
                            )
                        })}
                    </div>
                </div> :
                // 年份列表
                <div className="year-list">
                    {yearList.map((v) => {
                        return (
                            <div className={'year ' + (v === selectedYear ? 'selected-year' : '')}
                                key={v} onClick={() => onClickYear(v)}>{v}
                            </div>)
                    })}
                </div>
            }

            <Stack spacing={4} direction="row" justifyContent="flex-end">
                <CancelButton variant="text">Cancel</CancelButton>
                <Button variant="text">OK</Button>
            </Stack>
        </div>
    )
}
