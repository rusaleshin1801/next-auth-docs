"use client";

import React, { ReactNode, isValidElement } from "react";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { CircularProgress, Typography } from "@mui/material";
import clsx from "clsx";
import { StyledButton } from "./styles";

interface CustomButtonProps extends Omit<MuiButtonProps, "variant" | "color"> {
  color?: string;
  textColor?: string;
  label?: string | ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  startIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<CustomButtonProps> = ({
  color = "primary",
  textColor = "#fff",
  onClick,
  disabled = false,
  label = "",
  startIcon,
  isLoading = false,
  ...rest
}) => {
  const buttonClass =
    color === "primary" || color === "text" ? color : "customColor";

  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(buttonClass)}
      disableRipple
      startIcon={startIcon}
      {...rest}
      style={{
        ...(color !== "primary" && color !== "error"
          ? { backgroundColor: color }
          : {}),
      }}
    >
      {isLoading ? (
        <CircularProgress size={18} sx={{ color: "#fff" }} />
      ) : isValidElement(label) ? (
        label
      ) : (
        <Typography
          sx={{
            fontSize: "16px",
            whiteSpace: "nowrap",
          }}
          color={textColor}
          fontWeight={500}
        >
          {label}
        </Typography>
      )}
    </StyledButton>
  );
};
