import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  verticalPosition: "top" | "bottom";
  horizontalPosition: "left" | "right" | "center";
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

const initialState: SnackbarState = {
  open: false,
  verticalPosition: "bottom",
  horizontalPosition: "center",
  message: "Default message when no specific message is provided",
  severity: "success",
};

interface SnackbarPayload {
  open?: boolean;
  verticalPosition?: SnackbarState["verticalPosition"];
  horizontalPosition?: SnackbarState["horizontalPosition"];
  message?: string;
  severity?: SnackbarState["severity"];
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    updateSnackbar: (state, action: PayloadAction<SnackbarPayload>) => {
      const { open, verticalPosition, horizontalPosition, message, severity } =
        action.payload;
      if (open !== undefined) state.open = open;
      if (verticalPosition) state.verticalPosition = verticalPosition;
      if (horizontalPosition) state.horizontalPosition = horizontalPosition;
      if (message) state.message = message;
      if (severity) state.severity = severity;
    },
  },
});

export const { updateSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
