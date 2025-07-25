import { useState } from "react";

export default function useCalendarList() {
    const [calendarList, setCalendarList] = useState([]);

    const makeList = (age) => {
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
            ...Array(sleep).fill({ className: 'bg-sky-600', id: 'sleep' }),
            ...Array(work).fill({ className: 'bg-amber-700', id: 'work' }),
            ...Array(domesticWork).fill({ className: 'bg-lime-600', id: 'domesticWork' }),
            ...Array(eating).fill({ className: 'bg-orange-600', id: 'eating' }),
            ...Array(transport).fill({ className: 'bg-emerald-600', id: 'transport' }),
            ...Array(hygiene).fill({ className: 'bg-indigo-600', id: 'hygiene' }),
            ...Array(activities).fill({ className: 'bg-purple-600', id: 'activities' }),
            ...Array(monthLeft).fill({ className: 'border-2 border-slate-900/50', id: 'free' }),
        ];

        setCalendarList(list);

        return {
            sleep,
            work,
            domesticWork,
            eating,
            activities,
            transport,
            hygiene,
        };
    };

    return { makeList, calendarList };
}
