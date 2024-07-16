import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { baseService } from "../shared.config";
import { defaultPromiseToastOptions, PromiseToastOptions } from "../components";
import { ServiceError } from "../shared.types";
import { toast } from "sonner";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type UseMutationClientAxiosOptions<Data> = Pick<
  AxiosRequestConfig<Data>,
  // Pick as you need, make sure to also extract below or else these will be forwarded to useMutation instead of axios.request
  "url" | "data" | "method" | "headers"
>;

export type UseMutationClientOptions<Data, Response> =
  UseMutationClientAxiosOptions<Data> &
    UseMutationOptions<Response, ServiceError, Data> & {
      /** The service to use, defaults to baseService */
      service?: AxiosInstance;

      /** The options to pass to the toast.promise function, defaults to {@link defaultPromiseToastOptions} */
      toastOptions?: PromiseToastOptions;

      /** Optionally, you can also disable toasts entirely, this lets you handle toasts as you please */
      disableToast?: boolean;
    };

export type UseMutationClientFunctionProps<Data> = {
  data?: Data;
  config?: AxiosRequestConfig;
};

/**
 * A hook to use a mutation in combination with a service.
 * This hook essentially elimiates the need to write a custom mutation function for each service.
 *
 * @example
 *
 * const { mutate, isLoading, error } = useMutationClient({
 *  url: "/api/user",
 *  method: "POST",
 *  onSuccess: () => queryClient.invalidateQueries("user"),
 *  onError: (error) => console.error(error),
 *  toastOptions: {
 *    loading: "Saving...",
 *    success: data => `Saved user ${data.id}`,
 *    error: "Failed to save user"
 *  }
 * });
 */
export function useMutationService<Data = unknown, Response = unknown>(
  options?: UseMutationClientOptions<
    UseMutationClientFunctionProps<Data>,
    Response
  >,
) {
  // Extract the axios options from the mutation options
  const {
    url,
    data,
    method,
    headers,
    disableToast = false,
    service = baseService,
    toastOptions = defaultPromiseToastOptions,
    ...mutationOptions
  } = options || {};

  // Define the mutation function with an object containing data and optional config
  // This optional config can be used to provide additional axios settings at the time of mutation
  const mutationFn = async (
    props?: UseMutationClientFunctionProps<Data>,
  ): Promise<Response> => {
    const { data, config } = props || {};

    const promise = service.request({
      url,
      data,
      method,
      headers,
      ...config, // Spread the config to allow overriding default settings
    });

    if (!disableToast) {
      // Dismiss any existing toasts
      toast.dismiss();

      // Show a toast while the promise is pending
      toast.promise(promise, toastOptions);
    }

    // Await the promise and return the data
    const response: AxiosResponse<Response> = await promise;

    // Return the response data
    return response.data;
  };

  return useMutation<
    Response,
    ServiceError,
    UseMutationClientFunctionProps<Data>
  >({
    mutationFn,
    ...mutationOptions,
  });
}
