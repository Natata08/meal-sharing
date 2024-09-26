"use client";

import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

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
          © {currentYear} Your Company Name. All rights reserved.
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <IconButton
            component={Link}
            href='https://facebook.com/yourcompany'
            target='_blank'
            rel='noopener noreferrer'
            color='inherit'
          >
            <Facebook />
          </IconButton>
          <IconButton
            component={Link}
            href='https://twitter.com/yourcompany'
            target='_blank'
            rel='noopener noreferrer'
            color='inherit'
          >
            <Twitter />
          </IconButton>
          <IconButton
            component={Link}
            href='https://instagram.com/yourcompany'
            target='_blank'
            rel='noopener noreferrer'
            color='inherit'
          >
            <Instagram />
          </IconButton>
          <IconButton
            component={Link}
            href='https://linkedin.com/company/yourcompany'
            target='_blank'
            rel='noopener noreferrer'
            color='inherit'
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
