"use client";

import { createTheme, Theme } from "@mui/material/styles";

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#008F32",
    },
    secondary: {
      main: "#f5f5f5",
    },

    error: {
      main: "#CE2525",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 760,
      lg: 960,
      xl: 1200,
    },
  },
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          margin: "16px",
        },
      },
    },
  },
});

export default theme;
