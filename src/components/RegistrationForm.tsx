import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

export const RegistrationForm = () => {
  return (
    <Paper sx={{ maxWidth: "600px" }}>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        sx={{ p: 2 }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" color="primary">
            Registration Form
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type="text"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" sx={{ width: "100%" }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
