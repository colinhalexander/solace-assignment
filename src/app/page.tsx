"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomepageContent from "./homepage_content";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomepageContent />
    </QueryClientProvider>
  );
}
