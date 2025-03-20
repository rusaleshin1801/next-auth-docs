import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "16px",
  width: "1120px",
  margin: "40px auto",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    padding: "0 16px",
  },
}));

export const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});
