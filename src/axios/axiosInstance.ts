import { useAuthStore } from "@/feature/auth/store/authStore";
import axios, { AxiosError } from "axios";

import qs from "qs";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    mode: "cors",
    "Content-Type": "application/json",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  },
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  },
});

axiosInstance.interceptors.request.use(async (request) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const { refreshAccessToken, signOut } = useAuthStore();
      const accessToken = await refreshAccessToken();
      if (!accessToken.accessToken) {
        signOut();
      }

      if (originalRequest != null) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
