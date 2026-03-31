"use client";

import _ from "lodash";
import { Advocate } from "../types/advocate";
import Badge from "./badge";
import LoadingSpinner from "./loading";
import { ReactNode, useState } from "react";
import { formatPhoneNumber } from "../utils/formatting_util";

interface Props {
  readonly isLoading: boolean;
  readonly advocates: Advocate[];
}

const LoadingState = () => (
  <div className="flex justify-center items-center py-12">
    <LoadingSpinner />
  </div>
);

const EmptyState = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
    <p className="text-gray-500 text-lg">No advocates found</p>
  </div>
);

/**
 * Notes on future enhancements:
 * - create separate, more generic table component
 * - add generic sorting, filtering, text search
 * - add optional pagination and virtualization for larger datasets
 * - support more complex, custom & interactable table cells
 *   - i.e.: checkboxes, action buttons, popout windows, etc
 */
const AdvocatesTable = ({ advocates, isLoading }: Props) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (advocates.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 block max-h-[600px] relative overflow-y-auto">
          <thead>
            <tr>
              <HeaderCell>First Name</HeaderCell>
              <HeaderCell>Last Name</HeaderCell>
              <HeaderCell>City</HeaderCell>
              <HeaderCell>Degree</HeaderCell>
              <HeaderCell>Specialties</HeaderCell>
              <HeaderCell>Years of Experience</HeaderCell>
              <HeaderCell>Phone Number</HeaderCell>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {advocates.map((a) => (
              <tr
                key={a.id} // use unique id now that we have one
                className="hover:bg-gray-50 transition-colors"
              >
                <BodyCell>{a.firstName}</BodyCell>
                <BodyCell>{a.lastName}</BodyCell>
                <BodyCell>{a.city}</BodyCell>
                <BodyCell>{a.degree}</BodyCell>
                <SpecialtiesCell specialties={a.specialties} />
                <BodyCell>{a.yearsOfExperience}</BodyCell>
                <BodyCell>{formatPhoneNumber(a.phoneNumber)}</BodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface HeaderCellProps {
  children: ReactNode;
}
const HeaderCell = ({ children }: HeaderCellProps) => (
  <th className="px-6 py-3 text-center text-xs font-medium sticky top-0 z-10 bg-gray-50 text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

interface BodyCellProps {
  children: ReactNode;
  noWrap?: boolean;
}
const BodyCell = ({ children, noWrap = true }: BodyCellProps) => (
  <td
    className={`px-6 py-4 text-sm text-center ${
      noWrap ? "whitespace-nowrap" : ""
    }`}
  >
    {children}
  </td>
);

interface SpecialtiesCellProps {
  readonly specialties: string[];
}
const SpecialtiesCell = ({ specialties }: SpecialtiesCellProps) => {
  const [expanded, setExpanded] = useState(false);
  const toRender = expanded ? specialties : specialties.slice(0, 3);
  const numAdditional = specialties.length - 3;
  return (
    <BodyCell noWrap={false}>
      <div className="flex flex-wrap gap-1 items-center">
        {toRender.map((s) => (
          <Badge>{s}</Badge>
        ))}
        {numAdditional > 1 && (
          <div
            className="cursor-pointer hover:underline"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Show less" : `+ ${numAdditional} more`}
          </div>
        )}
      </div>
    </BodyCell>
  );
};

export default AdvocatesTable;
