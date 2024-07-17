import { notFound } from "next/navigation";

import { getUserById } from "@/modules/user/services";

export default async function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>User</h1>
      <p>{user.name}</p>
    </div>
  );
}
