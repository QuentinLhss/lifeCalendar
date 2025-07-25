"use client"
import {useRef, useEffect, useState, cloneElement} from "react";
import useCalendarList from "../hooks/useCalendarList";
import useGsapInertiaHover from "../hooks/useGsapInertiaHover";
import useGsapSplitText from "@/hooks/useGsapSplitText";

export default function Calendar({ age }) {
    const containerRef = useRef(null);
    const { calendarList, makeList } = useCalendarList();

    const [activityTotals, setActivityTotals] = useState(null)

    useEffect(() => {
        setActivityTotals(makeList(age));
    }, [age]);

    useGsapInertiaHover(containerRef, [calendarList]);
    useGsapSplitText(".split");

    console.log(activityTotals)

    return (
        <div>
            {activityTotals ? (
                <h2
                    className="split z-10a text-justify text-2xl font-semibold text-gray-800 mb-8">
                    Au long de votre vie vous avez passé
                    {" "+activityTotals.sleep} mois à
                    <span className="split  text-sky-600! font-mono font-bold duration-300 hover:text-3xl"> dormir</span>, {" "+activityTotals.work} à
                    <span className="split text-amber-700! font-mono font-bold duration-300 hover:text-3xl"> travailler</span>, {" "+activityTotals.domesticWork} aux
                    <span className="split text-lime-600! font-mono font-bold duration-300 hover:text-3xl"> travaux ménager</span>, {" "+activityTotals.eating} à
                    <span className="split text-orange-600! font-mono font-bold duration-300 hover:text-3xl"> manger</span>, {" "+activityTotals.transport} en
                    <span className="split text-emerald-600! font-mono font-bold duration-300 hover:text-3xl"> transports</span>, {" "+activityTotals.hygiene} pour votre
                    <span className="split text-indigo-600! font-mono font-bold duration-300 hover:text-3xl"> hygiène </span>et {" "+activityTotals.activities} pour vos
                    <span className="split text-purple-600! font-mono font-bold duration-300 hover:text-3xl"> loisirs</span>
                </h2>
            ) :
                (
                    <></>
                )
            }

            <div
                ref={containerRef}
                className="mwg_effect000 grid grid-flow-row-dense lg:grid-cols-36 md:grid-cols-12 grid-rows-3 gap-1"
            >
                {calendarList.map((block, key) => (
                    <div
                        key={key}
                        className={`media ${block.className} rounded-sm h-5 w-5`}
                        id={block.id}
                    />
                ))}
            </div>
        </div>

    );
}
