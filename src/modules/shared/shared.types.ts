import { AxiosError } from "axios";

/** The type of error your service throws */
export type ServiceError = AxiosError<{
  code: number;
  message: string;
}>;

export function isServiceError(error: unknown): error is ServiceError {
  return (
    (error as ServiceError)?.isAxiosError &&
    (error as ServiceError)?.response?.data?.code !== undefined
  );
}

export function getServiceErrorMessage(
  error: ServiceError,
): string | undefined {
  return isServiceError(error)
    ? error.response?.data?.message
    : (error as AxiosError).message;
}
