import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import FoodBankIcon from "@mui/icons-material/FoodBank";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import RecyclingIcon from "@mui/icons-material/Recycling";

import Image from "next/image";

const MissionItem = ({ icon, text }) => (
  <ListItem
    sx={{ flexDirection: "column", alignItems: "center", textAlign: "center" }}
  >
    <ListItemIcon
      sx={{ color: "primary.main", fontSize: 40, minWidth: "auto", mb: 2 }}
    >
      {icon}
    </ListItemIcon>
    <ListItemText
      primary={text}
      primaryTypographyProps={{ variant: "body1" }}
    />
  </ListItem>
);

const AboutUsPage = () => {
  const missionItems = [
    {
      icon: <FoodBankIcon />,
      text: "Reduce food waste by encouraging meal sharing",
    },
    {
      icon: <Diversity2Icon />,
      text: "Promote cultural diversity through culinary experiences",
    },
    {
      icon: <Diversity3Icon />,
      text: "Foster meaningful connections within communities",
    },
    {
      icon: <RecyclingIcon />,
      text: "Support local food economies and sustainable practices",
    },
  ];

  return (
    <main>
      <Container maxWidth='lg' sx={{ mt: 13 }}>
        <Typography
          variant='h2'
          component='h2'
          gutterBottom
          align='center'
          color='primary'
        >
          About Us
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mb: 8,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant='body1' align='center'>
              At FoodFriends, we believe that food has the power to bring people
              together and create meaningful connections. Our platform is
              designed to foster a sense of community by enabling individuals to
              share home-cooked meals with others in their neighborhood.
            </Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "50%" },
              height: { xs: "300px", md: "400px" },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <Image
              src='/images/about-us-image.jpg'
              alt='People having dinner together'
              fill
              style={{ objectFit: "cover" }}
              sizes='(max-width: 768px) 100vw, 50vw'
              priority
            />
          </Box>
        </Box>

        <Paper
          elevation={3}
          sx={{ p: 4, mb: 8, backgroundColor: "rgba(76, 175, 80, 0.1)" }}
        >
          <Typography
            variant='h4'
            component='h3'
            gutterBottom
            color='primary'
            align='center'
          >
            Our Mission
          </Typography>
          <Box
            component='ul'
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 4,
              p: 0,
              m: 0,
              listStyle: "none",
            }}
          >
            {missionItems.map((item, index) => (
              <List key={`mission-${index}`} sx={{ height: "100%" }}>
                <MissionItem icon={item.icon} text={item.text} />
              </List>
            ))}
          </Box>
        </Paper>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant='h6' color='primary'>
            Join us in this delicious adventure, and let's build stronger, more
            connected communities—one shared meal at a time!
          </Typography>
        </Box>
      </Container>
    </main>
  );
};

export default AboutUsPage;
