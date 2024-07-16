"use client";

import { Link } from "@/navigation";
import { routes, apiRoutes } from "@/routes";
import { Button } from "@/modules/shared/components";
import { useQueryService } from "@/modules/shared/hooks";

export default function UsersPage() {
  const url = apiRoutes.v1.users;

  const { data, isError, isLoading } = useQueryService({
    url,
    queryKey: [url],
  });

  if (isError) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user: { id: string; name: string }) => (
          <li key={user.id}>
            <Button asChild>
              <Link href={routes.user(user.id)}>{user.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
