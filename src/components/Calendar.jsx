"use client"
import { useEffect, useState } from "react";

export default function Calendar({ age }) {
    const [calendarList, setCalendarList] = useState([]);
    console.log(age)
    useEffect(() => {
        const parsedAge = Number(age);

        if (isNaN(parsedAge) || parsedAge <= 0) {
            console.error("Invalid age:", age);
            return;
        }

        const sleep = Math.floor(parsedAge * 4);
        const work = Math.floor(parsedAge * 3);
        const domesticWork = Math.round(parsedAge * 1.43);
        const eating = Math.round(parsedAge * 0.63);
        const activities = Math.round(parsedAge * 2.53);
        const transport = Math.round(parsedAge * 0.5);
        const hygiene = Math.round(parsedAge * 0.36);

        const totalUsed = sleep + work + domesticWork + eating + activities + transport + hygiene;
        const totalMonths = 90 * 12;
        const monthLeft = Math.max(0, totalMonths - totalUsed);

        const list = [
            ...Array(sleep).fill({ className: 'bg-emerald-800', id: 'sleep' }),
            ...Array(work).fill({ className: 'bg-blue-800', id: 'work' }),
            ...Array(domesticWork).fill({ className: 'bg-yellow-800', id: 'domesticWork' }),
            ...Array(eating).fill({ className: 'bg-pink-800', id: 'eating' }),
            ...Array(activities).fill({ className: 'bg-purple-800', id: 'activities' }),
            ...Array(transport).fill({ className: 'bg-orange-800', id: 'transport' }),
            ...Array(hygiene).fill({ className: 'bg-gray-800', id: 'hygiene' }),
            ...Array(monthLeft).fill({ className: 'border-3 border-indigo-600/40', id: 'free' }),
        ];

        setCalendarList(list);
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
