"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  useCreateUserDocMutation,
  useUpdateUserDocMutation,
  useGetUserDocsQuery,
  CreateUpdateUserDocRequest,
} from "@/store/slices/userDocsSlice";
import { Typography } from "@mui/material";
import { Input, Button } from "@/ui";
import { Container, FormContainer } from "./styles";
import { userDocFields } from "../../constanta/index";
import { useAppDispatch } from "@/hooks";
import { updateSnackbar } from "@/store/slices/snackbar";
import { formatDateForInput } from "@/utils/dateUtils";

export function UserDocForm() {
  const router = useRouter();
  const { id: docId } = useParams();
  const isEditMode = !!docId;
  const dispatch = useAppDispatch();

  const { data: documents, isLoading } = useGetUserDocsQuery();

  const initialData = useMemo(() => {
    return documents?.find((doc) => String(doc.id) === String(docId)) || null;
  }, [documents, docId]);

  const [createUserDoc, { isLoading: isCreating }] = useCreateUserDocMutation();
  const [updateUserDoc, { isLoading: isUpdating }] = useUpdateUserDocMutation();

  const { control, handleSubmit, reset } = useForm<CreateUpdateUserDocRequest>({
    defaultValues: {
      companySigDate: "",
      companySignatureName: "",
      documentName: "",
      documentStatus: "",
      documentType: "",
      employeeNumber: "",
      employeeSigDate: "",
      employeeSignatureName: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        companySigDate: formatDateForInput(initialData.companySigDate),
        companySignatureName: initialData.companySignatureName || "",
        documentName: initialData.documentName || "",
        documentStatus: initialData.documentStatus || "",
        documentType: initialData.documentType || "",
        employeeNumber: initialData.employeeNumber || "",
        employeeSigDate: formatDateForInput(initialData.employeeSigDate),
        employeeSignatureName: initialData.employeeSignatureName || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (formData: CreateUpdateUserDocRequest) => {
    try {
      if (isEditMode && (!docId || typeof docId !== "string")) {
        throw new Error("Некорректный ID документа.");
      }

      if (isEditMode) {
        await updateUserDoc({ id: String(docId), data: formData }).unwrap();
      } else {
        await createUserDoc(formData).unwrap();
      }

      router.push("/user-docs");
    } catch (error: unknown) {
      console.error(error);
      dispatch(
        updateSnackbar({
          open: true,
          message: "Ошибка при отправке данных. Попробуйте снова.",
          severity: "error",
        })
      );
    }
  };

  if (isEditMode && isLoading) {
    return <Typography align="center">Загрузка данных...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {isEditMode ? "Редактировать документ" : "Создать документ"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          {userDocFields.map(({ name, label, type, placeholder }) => (
            <Controller
              key={name}
              name={name as keyof CreateUpdateUserDocRequest}
              control={control}
              rules={{ required: "* Обязательное поле" }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          ))}

          <Button
            type="submit"
            label={isEditMode ? "Сохранить" : "Создать"}
            color="customColor"
            fullWidth
            isLoading={isCreating || isUpdating}
          />
        </FormContainer>
      </form>
    </Container>
  );
}
