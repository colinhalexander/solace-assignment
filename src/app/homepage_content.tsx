"use client";

import _ from "lodash";
import { useMemo, useState } from "react";
import { useAdvocates } from "./hooks/use_advocates";
import AdvocatesTable from "./components/advocates_table";
import Logo from "./components/logo";
import AdvancedFilters, {
  AdvancedFilterSettings,
} from "./components/advanced_filters";
import { Advocate } from "./types/advocate";
import SeedAdvocates from "./components/seed_advocates";

const filterForSearch = (searchTerm: string, advocates: Advocate[]) => {
  if (!searchTerm.trim()) return advocates;
  else {
    const searchRegex = new RegExp(searchTerm, "gi");
    return advocates.filter(
      (a) => JSON.stringify(a).match(searchRegex) !== null
    );
  }
};

const applyAdvancedFilters = (
  filters: AdvancedFilterSettings,
  advocates: Advocate[]
) => {
  return advocates.filter(
    (a) =>
      (!filters.city || a.city === filters.city) &&
      (!filters.degree || a.degree === filters.degree) &&
      (!filters.minExperience ||
        a.yearsOfExperience >= filters.minExperience) &&
      (!filters.specialty || a.specialties.includes(filters.specialty))
  );
};

/**
 * Notes on future enhancements:
 * - allow users to select multiple advocates and create a pop-up card view
 *   to compare multiple advocates
 * - break basic input and button components out into their own generic UI
 *   library components to apply consistent styling
 */
const HomepageContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [advancedFilters, setAdvancedFilters] =
    useState<AdvancedFilterSettings>({});
  const { data: advocates, isLoading, isError } = useAdvocates();

  const updateFilters = (update: Partial<AdvancedFilterSettings>) =>
    setAdvancedFilters((f) => ({ ...f, ...update }));

  const filteredAdvocates = useMemo(() => {
    if (!advocates) return [];
    else {
      return filterForSearch(
        searchTerm,
        applyAdvancedFilters(advancedFilters, advocates)
      );
    }
  }, [advocates, searchTerm, advancedFilters]);

  const resetFilters = () => {
    setSearchTerm("");
    setAdvancedFilters({});
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <Logo />
      </header>
      <section className="max-w-7xl mx-auto px-6 py-8 flex flex-col">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-2xl font-bold mb-6">Find an Advocate</h3>
          <div className="flex gap-3 mb-2">
            <input
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, city, specialty..."
            />
            <button
              onClick={resetFilters}
              className="px-6 py-2 green-bg rounded-md font-medium"
            >
              Reset
            </button>
          </div>
          <AdvancedFilters
            filters={advancedFilters}
            updateFilters={updateFilters}
            advocates={advocates ?? []}
          />
        </div>
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold">
              An unexpected error occurred. Please refresh your browser and try
              again.
            </h3>
          </div>
        )}
        <AdvocatesTable isLoading={isLoading} advocates={filteredAdvocates} />
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 my-6 w-fit self-center">
          <SeedAdvocates />
        </div>
      </section>
    </main>
  );
};

export default HomepageContent;
