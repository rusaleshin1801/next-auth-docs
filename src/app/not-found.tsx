import { Typography, Box } from "@mui/material";

export default async function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Typography variant="h2">Not Found</Typography>
    </Box>
  );
}
