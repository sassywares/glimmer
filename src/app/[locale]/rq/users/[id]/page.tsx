"use client";

import { userService } from "@/modules/user/user.service";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

export default function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = useTranslations();

  const { data, isError, isLoading } = useQuery({
    queryKey: [userService.key, id],
    queryFn: () => userService.getById(id),
  });

  if (isError) return <div>{t("sentences.somethingWentWrong")}</div>;

  if (isLoading) return <div>{t("words.loading")}</div>;

  if (!data) {
    notFound();
  }

  return (
    <div className="prose dark:prose-invert">
      <h1>User</h1>
      <p>{data.name}</p>
    </div>
  );
}
