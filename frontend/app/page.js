import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box className={styles.imageWrapper}>
        <Image
          src='/images/food-background.jpg'
          alt='Background picture with fresh vegetables'
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
        />
      </Box>

      <Container
        maxWidth='lg'
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box>
          <Box
            mb={4}
            sx={{
              backgroundColor: "rgba(164, 201, 15, 0.3)",
              padding: "2rem",
              borderRadius: "1rem",
              backdropFilter: "blur(3px)",
            }}
          >
            <Typography variant='h2' component='h2'>
              Share a meal,
              <br />
              make a connection
            </Typography>
          </Box>
          <Link href='/meals'>
            <Button variant='contained' color='primary' size='large'>
              Browse meals
            </Button>
          </Link>
        </Box>
      </Container>
    </main>
  );
}
