"use client";
import axios from "axios";
import { toast } from "sonner";
import { applyInterceptors } from "./interceptors";
import { getApiToken, clearSession } from "@/utils/storage";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

applyInterceptors(apiClient);

type ApiMethod = "get" | "post" | "put" | "delete";

export const apiRequest = async (
  method: ApiMethod,
  url: string,
  data?: any,
  responseType: "json" | "blob" = "json",
  silent = false,
) => {
  try {
    const payload = url === "/login" ? data : { ...data, token: getApiToken() };

    const response = await apiClient.request({
      method,
      url,
      data: payload,
      responseType,
    });

    if (responseType === "json") {
      const { header } = response.data;

      if (header) {
        if (method !== "get" && header.code === 200 && header.message && !silent) {
          toast.success(header.message);
        } else if (header.code !== 200) {
          toast.error(header.message || "Something went wrong");
        }

        if (header.code === 401) {
          window.location.href = "/login";
          clearSession();
        }
      }
    }

    return response;
  } catch (error: any) {
    if (error?.status === 401) {
      window.location.href = "/login";
      clearSession();
    } else if (
      error.response?.status === 400 ||
      error?.status === 400 ||
      error?.data?.code === 400
    ) {
      toast.error(error.data.header.message);
    }
    throw error;
  }
};
