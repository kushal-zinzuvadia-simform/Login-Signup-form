import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Box, Container, CssBaseline } from "@mui/material";

import { Login } from "./pages/Login";
import { PublicRoute } from "./routes/PublicRoute";
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
              <Route path="/" element={<Navigate to="/login" replace />} />

              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </Box>
    </>
  );
}
