"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SocialMediaIcons from "@/components/SocialMediaIcons";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <Box
      component='footer'
      className={isHomePage ? styles.hidden : undefined}
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        bgcolor: "rgb(111, 156, 61, 0.5)",
      }}
    >
      <Container maxWidth='lg'>
        <Typography variant='body1' align='center'>
          © {currentYear} FoodFriends. All rights reserved.
        </Typography>
        <SocialMediaIcons />
      </Container>
    </Box>
  );
}
