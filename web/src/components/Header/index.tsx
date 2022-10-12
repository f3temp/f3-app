import {
  Container,
  Link,
  Typography,
  styled,
  AppBar,
  Button,
  Toolbar,
} from "@mui/material";

function Header() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        marginBottom: "4rem",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          F3 Seattle
        </Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="/ballard"
            sx={{ my: 1, mx: 1.5 }}
          >
            Locations
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Learn More
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="../../"
            sx={{ my: 1, mx: 1.5 }}
          >
            Contact Us
          </Link>
        </nav>
        <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
