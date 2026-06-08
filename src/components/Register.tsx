import { useForm } from "react-hook-form";
import { schema, type Schema } from "../types/schema";
import { Stack, TextField, Paper, Typography, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

export const Register = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4" align="center">
          Register
        </Typography>

        <TextField
          {...register("firstName")}
          label="First Name"
          fullWidth
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        <TextField
          {...register("lastName")}
          label="Last Name"
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <TextField
          {...register("email")}
          label="Email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("address")}
          label="Address"
          fullWidth
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        <TextField
          {...register("city")}
          label="City"
          fullWidth
          error={!!errors.city}
          helperText={errors.city?.message}
        />

        <Button variant="contained" size="large" disabled={!isValid}>
          Register
        </Button>
      </Stack>
    </Paper>
  );
};
