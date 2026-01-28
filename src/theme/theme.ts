import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
            primary: {
      main: "#1DB584", // Verde teal come negli screenshot
      light: "#4ECDC4",
      dark: "#0D8F66",
    },


        secondary: {
      main: "#FF6B6B",
      light: "#FF9999",
      dark: "#FF3333",
    },

        background: {
      default: "#0B1426", // Sfondo principale blu scuro
      paper: "#1A2332", // Sfondo card/componenti
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    divider: "#2A3441",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A2332",
          boxShadow: "none",
          borderBottom: "1px solid #2A3441",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1A2332",
          borderRight: "1px solid #2A3441",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A2332",
          border: "1px solid #2A3441",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(29, 181, 132, 0.3)",
          },
        },
      },
    },
  },
});