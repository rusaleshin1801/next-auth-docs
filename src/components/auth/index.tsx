"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { Typography } from "@mui/material";
import { Button, Input } from "@/ui";
import { useLoginMutation, LoginRequest } from "@/store/slices/authApi";
import { updateSnackbar } from "@/store/slices/snackbar";
import { useAppDispatch } from "@/hooks";

import {
  Container,
  FormContainer,
  SubmitButton,
  FormWrapper,
  Card,
} from "./styles";

export function Auth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, { isLoading, isSuccess, data }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginRequest>();

  useEffect(() => {
    if (isSuccess && data?.data?.token) {
      setCookie("auth_token", data.data.token, { maxAge: 60 * 60 * 24 });
      router.push("/user-docs");
      dispatch(
        updateSnackbar({
          message: "Успешный вход!",
          severity: "success",
          open: true,
        })
      );
    }
  }, [isSuccess, data, router, dispatch]);

  useEffect(() => {
    if (data?.error_code !== 0 && data?.error_text) {
      dispatch(
        updateSnackbar({
          open: true,
          message: data?.error_text,
          severity: "warning",
        })
      );
      reset();
    }
  }, [data, dispatch, reset]);

  const onSubmit = (formData: LoginRequest) => {
    login({ username: formData.username, password: formData.password });
  };

  return (
    <Container>
      <FormWrapper>
        <Card>
          <Typography variant="h5" align="center" gutterBottom>
            Войти в систему
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
              <Input
                label="Логин"
                placeholder="Введите логин"
                {...register("username", { required: "Введите логин" })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <Input
                label="Пароль"
                placeholder="Введите пароль"
                type="password"
                {...register("password", { required: "Введите пароль" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </FormContainer>

            <SubmitButton>
              <Button
                type="submit"
                label="Войти"
                color="customColor"
                fullWidth
                isLoading={isLoading}
              />
            </SubmitButton>
          </form>
        </Card>
      </FormWrapper>
    </Container>
  );
}
