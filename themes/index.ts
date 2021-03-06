import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      default: "#fafafa",
      paper: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Vazirmatn FD",
  },
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      default: "#161B25",
      paper: "#161b25",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(255,255,255,0.12)",
    action: {
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.3)",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(255, 255, 255, 0.23)",
          fill: "rgb(255, 255, 255)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "rgb(255, 255, 255)",
          fill: "#FFF",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          fill: "#FFF",
        },
      },
    },
  },
  typography: {
    fontFamily: "Vazirmatn FD",
  },
});
