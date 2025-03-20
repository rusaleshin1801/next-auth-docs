"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider } from "@mui/material/styles";
import { PositionedSnackbar } from "@/ui";
import theme from "@/utils/theme";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children}
        <PositionedSnackbar />
      </ThemeProvider>
    </Provider>
  );
}
