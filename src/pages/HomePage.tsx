import { Box, Stack, Typography } from "@mui/material";

export const HomePage = () => {
  return (
    <Box sx={{ px: 16, py: 8 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h1">Eppendorf Challenge</Typography>
      </Stack>
    </Box>
  );
};
