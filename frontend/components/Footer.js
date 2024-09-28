"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SocialMediaIcons from "@/components/SocialMediaIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth='sm'>
        <Typography variant='body1' align='center'>
          © {currentYear} Meal Sharing. All rights reserved.
        </Typography>
        <SocialMediaIcons />
      </Container>
    </Box>
  );
}
