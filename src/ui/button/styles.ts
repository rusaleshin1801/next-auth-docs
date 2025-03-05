import { styled } from "@mui/material/styles";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export const StyledButton = styled(MuiButton)<MuiButtonProps>(({ theme }) => ({
  "&.MuiButton-root": {
    borderRadius: "16px",
    boxShadow: "none",
    textTransform: "none",
    padding: "12px 22px",
  },

  "&.primary": {
    backgroundColor: "rgba(0, 143, 50, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(0, 143, 50, 0.3)",
    },
    "&.Mui-disabled": {
      opacity: 0.4,
    },
  },

  "&.text": {
    backgroundColor: "transparent",
    "&:hover": {
      opacity: 0.7,
    },
  },

  "&.customColor": {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      opacity: 0.8,
    },
  },
}));
