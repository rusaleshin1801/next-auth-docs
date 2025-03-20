import { styled } from "@mui/material/styles";
import { Box, Paper, TableContainer, TableRow } from "@mui/material";

export const StyledBox = styled(Box)({
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: "40px auto",
  width: "1400px",
  padding: "16px",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "16px",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

export const ControlsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",

  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

export const StyledTableContainer = styled(TableContainer)({
  borderRadius: "8px",
  overflow: "hidden",
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.secondary.main,
  },
}));
