"use client";

import { useQuery, QueryClientContext } from "@tanstack/react-query";
import { Advocate } from "../types/advocate";
import { useCallback, useContext } from "react";

const fetchAdvocates = (): Promise<Advocate[]> =>
  fetch("/api/advocates")
    .then((r) => r.json())
    .then((r) => r.data);

const advocatesQueryKey = "fetchAdvocates";
export const useAdvocates = () =>
  useQuery({
    queryKey: [advocatesQueryKey],
    queryFn: fetchAdvocates,
  });

export const useSeedAdvocates = () => {
  const queryClient = useContext(QueryClientContext);
  const seedAdvocates = useCallback(
    (n?: number) =>
      fetch(`/api/seed${n ? `?n=${n}` : ""}`, {
        method: "POST",
      }).then(() => {
        queryClient?.invalidateQueries({ queryKey: [advocatesQueryKey] });
      }),
    [queryClient]
  );

  return seedAdvocates;
};
