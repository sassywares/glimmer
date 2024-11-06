import { userService } from "@/modules/user/user.service";
import { notFound } from "next/navigation";

export default async function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await userService.getById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="prose dark:prose-invert">
      <h1>User</h1>
      <p>{user.name}</p>
    </div>
  );
}
