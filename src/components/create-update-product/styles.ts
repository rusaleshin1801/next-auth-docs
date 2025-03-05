import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

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

export const DropzoneContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.secondary.main}`,
  padding: "20px",
  textAlign: "center",
  borderRadius: "8px",
  cursor: "pointer",
  position: "relative",
}));

export const ImagePreviewContainer = styled(Box)({
  display: "flex",
  gap: "10px",
});

export const ImagePreview = styled("img")(({ theme }) => ({
  maxWidth: "320px",
  maxHeight: "320px",
  objectFit: "cover",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.secondary.main}`,
}));

export const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const Title = styled(Typography)({
  variant: "h5",
});

export const SubmitButton = styled(Box)({
  marginTop: "16px",
});
