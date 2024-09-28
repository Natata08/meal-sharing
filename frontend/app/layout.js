import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

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
          <Navbar />
          <Container
            component='main'
            maxWidth='lg'
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              py: 3, // Add some padding to the top and bottom
            }}
          >
            {children}
          </Container>
          <Footer />
        </Box>
      </body>
    </html>
  );
}
