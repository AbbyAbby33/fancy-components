import Calendar from "../components/Calendar";

export default function CalendarPage() {

    const onClickOk = function () {};

    const onClickCancel = function () {};

    return (
        <div>
            <Calendar handleClickOk={() => onClickOk} handleClickCancel={() => onClickCancel} />
        </div>
    )
}
