import { BrowserRouter } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}
