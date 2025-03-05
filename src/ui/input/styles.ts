import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    outline: "none",
    borderRadius: "16px",
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: "12px",
    "&.Mui-disabled": {
      WebkitTextFillColor: theme.palette.text.primary,
    },
  },
  "& .MuiOutlinedInput-root": {
    "& input": {
      borderRadius: "16px",
      padding: "0 8px",
    },
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      borderWidth: 0,
    },
    "&.Mui-error fieldset": {
      border: `1px solid ${theme.palette.error.main}`,
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "16px",
    fontWeight: 500,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "gray",
    opacity: 0.4,
    fontSize: "14px",
    fontWeight: 400,
  },
}));
