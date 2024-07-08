// src/modules/shared/hooks/use-query-service.ts

import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { baseService } from "../shared.config";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type UseQueryClientAxiosOptions<Data> = Pick<
  AxiosRequestConfig<Data>,
  "url" | "method" | "headers"
>;

export type UseQueryClientOptions<Response, Data> =
  UseQueryClientAxiosOptions<Data> &
    UseQueryOptions<Response, AxiosError, Data> & {
      /** The service to use, defaults to baseService */
      service?: AxiosInstance;
    };

/**
 * @example
 * const { data, isLoading, error } = useQueryClient({
 *  url: "/api/user",
 *  enabled: !!token,
 *  select: (data) => data.user,
 *  headers: {
 *    Authorization: `Bearer ${token}`,
 *  }
 * }
 */
export function useQueryService<Data = any, Response = any>({
  url,
  method = "GET",
  headers,
  service = baseService,
  ...queryOptions
}: UseQueryClientOptions<Response, Data>) {
  const queryFn = async (): Promise<Response> => {
    const response: AxiosResponse<Response> = await service.request({
      url,
      method,
      headers,
    });

    return response.data;
  };

  return useQuery<Response, AxiosError, Data>({
    queryFn,
    ...queryOptions,
  });
}