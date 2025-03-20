"use client";

import {
  InputAdornment,
  TextFieldProps,
  InputLabel,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { ReactNode, forwardRef, useState } from "react";
import { StyledTextField } from "./styles";

export interface InputProps extends Omit<TextFieldProps, "variant"> {
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  width?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    placeholder,
    type = "text",
    disabled = false,
    error = false,
    errorMessage,
    onChange,
    onBlur,
    startIcon,
    sx,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: props.width || "100%",
      }}
    >
      {label && (
        <InputLabel sx={{ fontSize: "14px", fontWeight: 500 }}>
          {label}
        </InputLabel>
      )}
      <StyledTextField
        placeholder={placeholder}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        autoComplete="off"
        error={error}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment:
            type === "password" ? (
              <InputAdornment
                position="end"
                sx={{ marginRight: "8px", opacity: "0.4" }}
              >
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? (
                    <VisibilityOff sx={{ fontSize: "16px" }} />
                  ) : (
                    <Visibility sx={{ fontSize: "16px" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ) : (
              rest.endIcon && (
                <InputAdornment position="end">{rest.endIcon}</InputAdornment>
              )
            ),
        }}
        sx={sx}
        {...rest}
      />

      {errorMessage && (
        <Typography
          color="error"
          sx={{ fontSize: "12px", marginTop: "4px", fontStyle: "italic" }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
});

Input.displayName = "Input";
