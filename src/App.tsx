import { Box, Container, CssBaseline } from "@mui/material";

import { Register } from "./components/Register";

export function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.100",
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Register />
        </Container>
      </Box>
    </>
  );
}
