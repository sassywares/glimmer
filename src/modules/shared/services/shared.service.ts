import axios from "axios";

/** The client-side api instance to use */
export const sharedService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SHARED_SERVICE_URL,
});
