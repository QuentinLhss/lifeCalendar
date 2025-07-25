import { useState } from "react";

export default function AgeForm({ onSubmit }) {
    const [ageInput, setAgeInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ageInput.trim() !== "") {
            onSubmit(ageInput);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="number"
                value={ageInput}
                onChange={(e) => setAgeInput(e.target.value)}
                placeholder="Entrez votre âge"
                min="1" max="100"
                className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
                Envoyer
            </button>
        </form>
    );
}
