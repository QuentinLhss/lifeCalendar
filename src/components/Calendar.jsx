import { useEffect, useState } from "react";
import useCalendarList from "../hooks/useCalendarList";

export default function Calendar({ age }) {
    const {calendarList, makeList} = useCalendarList();
    console.log(age)
    useEffect(() => {
        makeList(age)
    }, [age]);

    return (
        <div className="grid grid-flow-row-dense grid-cols-36 grid-rows-3 gap-2">
            {calendarList.map((block, key) => (
                <div
                    key={key}
                    className={` ${block.className} rounded-sm h-5 w-5`}
                />
            ))}
        </div>
    );
}
