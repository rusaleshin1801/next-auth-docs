import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApiQuery } from "@/store/baseApiQuery";

interface LoginResponse {
  token?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

interface ApiResponse {
  error_code: number;
  error_text?: string;
  data?: LoginResponse | null;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseApiQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: "/ru/data/v3/testmethods/docs/login",
        method: "POST",
        body: { username, password },
      }),
      transformResponse: (response: ApiResponse) => response,
    }),
  }),
});

export const { useLoginMutation } = authApi;
