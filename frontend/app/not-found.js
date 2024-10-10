import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function NotFound() {
  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <Typography variant='h2' component='h2' gutterBottom>
          Not Found
        </Typography>
        <Typography variant='body1' paragraph>
          Could not find requested resource
        </Typography>
        <Link href='/' passHref>
          <Button variant='contained' color='primary'>
            Return Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
