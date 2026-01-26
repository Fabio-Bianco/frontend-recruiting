import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();      // recuperi la funzione logout dal context
  const navigate = useNavigate();    // per reindirizzare dopo il logout

  function handleLogout() {
    logout();                        // 1. cancella user + sessionStorage
    navigate("/login", { replace: true }); // 2. vai alla login
  }

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        {/* Titolo a sinistra */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Recruiting Dashboard
        </Typography>

        {/* Menu centrale */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/posts">
            Posts
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Box>

        {/* Bottone Logout a destra */}
        <Box sx={{ ml: 2 }}>
          <Button
            color="error"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
