"use client";

import { apiRoutes } from "@/routes";
import { useQueryService } from "@/modules/shared/hooks";

export default function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const url = apiRoutes.v1.user(id);

  const { data, isError, isLoading } = useQueryService({
    url,
    queryKey: [url],
  });

  if (isError) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User</h1>
      <p>{data.name}</p>
    </div>
  );
}
