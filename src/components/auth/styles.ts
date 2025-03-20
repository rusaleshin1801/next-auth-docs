import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f4f6f8",
});

export const FormWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
});

export const Card = styled(Paper)({
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
});

export const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
});

export const SubmitButton = styled(Box)({
  marginTop: "16px",
});
