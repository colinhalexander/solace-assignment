import _ from "lodash";
import { useMemo } from "react";

interface Props<T> {
  options: T[];
  selectedOption?: T;
  emptyValue?: string;
  onSelectOption: (t?: T) => void;
  toOptionValue: (t: T) => string;
  toOptionDisplay: (t: T) => string | React.ReactNode;
}
const Selector = <T,>({
  options,
  selectedOption,
  emptyValue = "Any",
  onSelectOption,
  toOptionValue,
  toOptionDisplay,
}: Props<T>) => {
  const optionsByVal = useMemo(
    () => _.keyBy(options, toOptionValue),
    [options]
  );
  return (
    <select
      value={selectedOption ? toOptionValue(selectedOption) : ""}
      onChange={(e) => onSelectOption(optionsByVal[e.target.value])}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-sm cursor-pointer hover:border-gray-400 transition-colors"
    >
      <option value="">{emptyValue}</option>
      {options.map((o) => (
        <option key={toOptionValue(o)} value={toOptionValue(o)}>
          {toOptionDisplay(o)}
        </option>
      ))}
    </select>
  );
};

export default Selector;
