"use client";

import { createTheme } from "@mui/material/styles";
import { Josefin_Sans } from "next/font/google";

const josefin_Sans = Josefin_Sans({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#6F9C3D",
    },
    secondary: {
      main: "#FFB366",
    },
  },
  typography: {
    fontSize: 18,
    fontFamily: josefin_Sans.style.fontFamily,
  },
});

export default theme;
