"use client";

import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

import { useUserById } from "@/modules/user/hooks";

export default function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = useTranslations("Status.Messages");

  const { data, isError, isLoading } = useUserById(id);

  if (isError) return <div>{t("error")}</div>;

  if (isLoading) return <div>{t("loading")}</div>;

  if (!data) {
    notFound();
  }

  return (
    <div>
      <h1>User</h1>
      <p>{data.name}</p>
    </div>
  );
}
