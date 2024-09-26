import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box, CssBaseline } from "@mui/material";

export const metadata = {
  title: "Meal-sharing app",
  description: "App for people who share their meal",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <CssBaseline />
          <Box component='main' sx={{ flexGrow: 1 }}>
            <header>
              <Navbar />
            </header>
            {children}
          </Box>
          <Footer />
        </Box>
      </body>
    </html>
  );
}
