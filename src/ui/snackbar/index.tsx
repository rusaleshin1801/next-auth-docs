"use client";
import React from "react";
import { Snackbar, Alert, styled } from "@mui/material";
import { updateSnackbar } from "@/store/slices/snackbar";
import { useAppDispatch, useAppSelector } from "@/hooks";

const CustomAlert = styled(Alert)(({ theme, severity }) => ({
  ...(severity === "warning" && {
    backgroundColor: "black",
    color: theme.palette.primary.main,
  }),
}));

export const PositionedSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open, verticalPosition, horizontalPosition, message, severity } =
    useAppSelector((state) => state.snackbar);

  const handleClose = React.useCallback(() => {
    dispatch(updateSnackbar({ open: false }));
  }, [dispatch]);

  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: verticalPosition,
        horizontal: horizontalPosition,
      }}
      open={open}
      onClose={handleClose}
    >
      <CustomAlert
        onClose={handleClose}
        severity={severity ?? "success"}
        variant="filled"
      >
        {message}
      </CustomAlert>
    </Snackbar>
  );
};
