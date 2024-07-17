import { sharedService } from "../services";

import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import {
  useQuery,
  QueryFunction,
  UseQueryOptions,
} from "@tanstack/react-query";

import type { ServiceError } from "../shared.types";

export type UseQueryServiceAxiosOptions<Data> = Pick<
  AxiosRequestConfig<Data>,
  "url" | "data" | "method" | "headers"
>;

export type UseQueryServiceOptions<Data, Response> =
  UseQueryServiceAxiosOptions<Data> &
    UseQueryOptions<Response, ServiceError> & {
      /** The service to use, defaults to baseService */
      service?: AxiosInstance;
    };

/**
 * @example
 * const { data, isLoading, error } = useQueryService({
 *  url: "/api/user",
 *  enabled: !!token,
 *  select: (data) => data.user,
 *  headers: {
 *    Authorization: `Bearer ${token}`,
 *  }
 * }
 */
export function useQueryService<Data = unknown, Response = unknown>({
  url,
  data,
  headers,
  method = "GET",
  service = sharedService,
  ...queryOptions
}: UseQueryServiceOptions<Data, Response>) {
  const queryFn: QueryFunction<Response> = async (): Promise<Response> => {
    const response: AxiosResponse<Response> = await service.request({
      url,
      data,
      method,
      headers,
    });

    return response.data;
  };

  return useQuery<Response, ServiceError>({
    queryFn,
    ...queryOptions,
  });
}
