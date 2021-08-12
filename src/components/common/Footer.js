import { Box, Typography } from "@material-ui/core";
import React from "react";

const Footer = () => {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Scalar © "}
        <span color="inherit" href="https://material-ui.com/">
          Emilio E. Hurtado
        </span>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
