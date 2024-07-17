import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { routes } from "@/routes";
import { Link } from "@/navigation";
import { getUsers } from "@/modules/user/services";
import { Button } from "@/modules/shared/components";
import { PageProps } from "@/modules/shared/shared.types";

export default async function UsersPage({ params: { locale } }: PageProps) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = await getTranslations("Status.Messages");

  const users = await getUsers();

  if (!users) return <div>{t("error")}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: { id: string; name: string }) => (
          <li key={user.id}>
            <Button asChild>
              <Link href={routes.rsc.user(user.id)}>{user.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
