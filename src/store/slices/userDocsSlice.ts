import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApiQuery } from "@/store/baseApiQuery";

export interface UserDoc {
  id: string;
  companySigDate: string | null;
  companySignatureName: string | null;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string | null;
  employeeSignatureName: string | null;
}

export interface CreateUpdateUserDocRequest {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

type ApiResponse = { success: boolean };
type UpdateUserDocRequest = { id: string; data: CreateUpdateUserDocRequest };

export const userDocsApi = createApi({
  reducerPath: "userDocsApi",
  baseQuery: baseApiQuery,
  tagTypes: ["UserDocs"],
  endpoints: (builder) => ({
    getUserDocs: builder.query<UserDoc[], void>({
      query: () => "/ru/data/v3/testmethods/docs/userdocs/get",
      transformResponse: (response: { data: UserDoc[] }) => response.data,
      providesTags: ["UserDocs"],
    }),

    createUserDoc: builder.mutation<ApiResponse, CreateUpdateUserDocRequest>({
      query: (newDoc) => ({
        url: "/ru/data/v3/testmethods/docs/userdocs/create",
        method: "POST",
        body: newDoc,
      }),
      invalidatesTags: ["UserDocs"],
    }),

    updateUserDoc: builder.mutation<ApiResponse, UpdateUserDocRequest>({
      query: ({ id, data }) => ({
        url: `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserDocs"],
    }),

    deleteUserDoc: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        method: "POST",
      }),
      transformResponse: (response: {
        error_code: number;
        error_text: string;
      }) => {
        return {
          success: response.error_code === 0,
          errorMessage: response.error_text || "Ошибка удаления документа",
        };
      },
      invalidatesTags: ["UserDocs"],
    }),
  }),
});

export const {
  useGetUserDocsQuery,
  useCreateUserDocMutation,
  useUpdateUserDocMutation,
  useDeleteUserDocMutation,
} = userDocsApi;
