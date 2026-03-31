"use client";

import { useState } from "react";
import { useSeedAdvocates } from "../hooks/use_advocates";

const SeedAdvocates = () => {
  const [count, setCount] = useState<number>(10);
  const [isSeeding, setIsSeeding] = useState(false);
  const seedAdvocates = useSeedAdvocates();

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedAdvocates(count);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="advocate-count" className="text-sm font-medium">
        Generate advocates:
      </label>
      <input
        id="advocate-count"
        type="number"
        min="1"
        max="1000"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
        disabled={isSeeding}
        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <button
        onClick={handleSeed}
        disabled={isSeeding}
        className="px-6 py-2 green-bg rounded-md font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSeeding ? "Generating..." : "Generate"}
      </button>
    </div>
  );
};

export default SeedAdvocates;