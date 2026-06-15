import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Box, Container, CssBaseline } from "@mui/material";

import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Register } from "./pages/Register";

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
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                index
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </Container>
      </Box>
    </>
  );
}
