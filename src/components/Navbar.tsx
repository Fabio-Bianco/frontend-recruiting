import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        // Barra di navigazione principale dell’app
        <AppBar position="static" elevation={0}>

        // Contenuto della barra di navigazione
            <Toolbar>

        // Titolo dell’app
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Recruiting Dashboard
                </Typography>

        // Link di navigazione
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
            </Toolbar>
        </AppBar>
    )
}