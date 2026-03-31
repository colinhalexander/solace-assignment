import { useMemo, useState } from "react";
import { Advocate } from "../types/advocate";
import _ from "lodash";
import Selector from "./selector";

interface Props {
  readonly advocates: Advocate[];
  readonly filters: AdvancedFilterSettings;
  readonly updateFilters: (f: Partial<AdvancedFilterSettings>) => void;
}

export interface AdvancedFilterSettings {
  readonly city?: string;
  readonly degree?: string;
  readonly specialty?: string;
  readonly minExperience?: number;
}

/**
 * Notes on future enhancements:
 * - create multi-select component
 * - enable more complex/feature-rich filters (multi-select, searchable)
 */
const sortedUniq = <T extends string | number>(vals: T[]) =>
  _.sortBy(_.uniq(vals));

const AdvancedFilters = ({ advocates, filters, updateFilters }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const uniqueValues = useMemo(() => {
    const cities = advocates.map((a) => a.city);
    const degrees = advocates.map((a) => a.degree);
    const specialties = advocates.flatMap((a) => a.specialties);
    const yearsOfExperience = advocates.map((a) => a.yearsOfExperience);
    return {
      cities: sortedUniq(cities),
      degrees: sortedUniq(degrees),
      specialties: sortedUniq(specialties),
      yearsOfExperience: sortedUniq(yearsOfExperience),
    };
  }, [advocates]);

  return (
    <>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
      >
        {expanded ? "- Hide Advanced Filters" : "+ Advanced Filters"}
      </button>
      {expanded && (
        <div className="mt-4 flex flex-wrap gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              By City:
            </label>
            <Selector
              options={uniqueValues.cities}
              selectedOption={filters.city}
              onSelectOption={(city) => updateFilters({ city })}
              toOptionDisplay={(c) => c}
              toOptionValue={(c) => c}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              By Degree:
            </label>
            <Selector
              options={uniqueValues.degrees}
              selectedOption={filters.degree}
              onSelectOption={(degree) => updateFilters({ degree })}
              toOptionDisplay={(d) => d}
              toOptionValue={(d) => d}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              By Specialty:
            </label>
            <Selector
              options={uniqueValues.specialties}
              selectedOption={filters.specialty}
              onSelectOption={(specialty) => updateFilters({ specialty })}
              toOptionDisplay={(s) => s}
              toOptionValue={(s) => s}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Years of Experience:
            </label>
            <input
              type="number"
              min={0}
              value={filters.minExperience}
              onChange={(e) =>
                updateFilters({
                  minExperience: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              placeholder="Any"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdvancedFilters;
