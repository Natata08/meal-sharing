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
          Meal not found
        </Typography>
        <Typography variant='body1'>Could not find requested meal</Typography>
        <Link href='/meals' passHref>
          <Button variant='contained' color='primary'>
            Return to all meals
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
