"use client";

import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

import { routes } from "@/routes";
import { Link } from "@/navigation";
import { useUsers } from "@/modules/user/hooks";
import { Button } from "@/modules/shared/components";

export default function UsersPage() {
  const t = useTranslations("Status.Messages");

  const { data, isError, isLoading } = useUsers();

  if (isError) return <div>{t("error")}</div>;

  if (isLoading) return <div>{t("loading")}</div>;

  if (!data) {
    notFound();
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <Button asChild>
              <Link href={routes.reactQuery.user(user.id)}>{user.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
