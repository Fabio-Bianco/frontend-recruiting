// src/layouts/ProtectedLayout.tsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar"; // ✅ adatta path

export default function ProtectedLayout() {
  return (
    <Box>
      {/* Sempre visibile quando loggato */}
      <Navbar />

      {/* Qui dentro si renderizzano le pagine: Home, Posts, Users, ecc */}
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
