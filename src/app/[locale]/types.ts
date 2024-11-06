import { PropsWithChildren } from "react";

export type PageParams = {
  locale: string;
};

export type PageProps = Readonly<{
  params: PageParams;
}>;

export type LayoutProps = Readonly<
  PropsWithChildren<{
    params: PageParams;
  }>
>;
