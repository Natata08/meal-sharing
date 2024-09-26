"use client";

import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component='footer' sx={{ bgcolor: "background.paper", py: 4 }}>
      <Container maxWidth='lg'>
        <Typography variant='body2' color='text.secondary' align='center'>
          © {currentYear} Meal Sharing. All rights reserved.
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <IconButton
            component={Link}
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Facebook />
          </IconButton>
          <IconButton
            component={Link}
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Twitter />
          </IconButton>
          <IconButton
            component={Link}
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Instagram />
          </IconButton>
          <IconButton
            component={Link}
            href='https://linkedin.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
