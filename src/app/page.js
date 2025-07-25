"use client";
import { useState } from "react";
import useJellyCursor from "@/hooks/useJellyCursor";
import AgeForm from "@/components/AgeFrom";
import Calendar from "@/components/Calendar";

export default function Home() {
    const [submittedAge, setSubmittedAge] = useState(null);
    useJellyCursor();

    return (
        <>
            <div id="jelly-cursor" className="fixed top-0 left-0 w-6 h-6 bg-sky-500 rounded-full pointer-events-none z-[9999]"></div>
            <div className="cursor-none min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 m-20 w-full ld:max-w-6/10 ">
                    {!submittedAge ? (
                        <>
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">Quel est votre âge ?</h1>
                            <AgeForm onSubmit={setSubmittedAge}/>
                        </>
                    ) : (
                        <div>
                            <Calendar age={submittedAge}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
