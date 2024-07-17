import { AxiosError } from "axios";

/** The type of error your service throws */
export type ServiceError = AxiosError<{
  code: string;
  message: string;
}>;

export interface PageParams {
  locale: string;
}

export interface PageProps {
  params: PageParams;
}

export interface LayoutProps {
  params: PageParams;
  children: React.ReactNode;
}
