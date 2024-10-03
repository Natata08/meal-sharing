import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";

const socialMediaLinks = [
  { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
  { name: "LinkedIn", icon: LinkedIn, url: "https://linkedin.com" },
];

export default function () {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {socialMediaLinks.map((socialLink) => (
        <IconButton
          key={socialLink.name}
          component='a'
          href={socialLink.url}
          target='_blank'
          rel='noopener noreferrer'
          color='inherit'
          aria-label={`Visit our ${socialLink.name} page`}
        >
          <socialLink.icon />
        </IconButton>
      ))}
    </Box>
  );
}
