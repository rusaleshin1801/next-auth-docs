import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getCookie } from "cookies-next";

export const baseApiQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getCookie("auth_token");

    if (token) {
      headers.set("x-auth", token as string);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});
