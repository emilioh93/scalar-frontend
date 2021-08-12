import { Box } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import React from "react";

const Details = () => {
  return (
    <Container>
      <Box mt={7}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            imagen
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eos
            vel repudiandae quo voluptatum, quae numquam cupiditate natus quis
            similique dolore eum obcaecati sunt debitis ex libero accusamus sed
            voluptas.
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Details;
