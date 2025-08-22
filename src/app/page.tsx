"use client";

import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

export default function Page() {
  const healthQuery = useQuery(orpc.health.queryOptions());

  return <div>{healthQuery.data?.status}</div>;
}
