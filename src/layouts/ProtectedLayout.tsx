import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar"; 

export default function ProtectedLayout() {
  return (
    <Box>
      {/* Cornice UI sempre presente quando loggato */}
      <Navbar />

      {/* Contenuto pagina (Home/Posts/Users/Details...) */}
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
