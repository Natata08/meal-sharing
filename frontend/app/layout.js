import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import { ThemeProvider } from "@mui/system";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <CssBaseline />
            <Header />

            {children}

            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
