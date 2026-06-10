import { Controller, useForm } from "react-hook-form";
import { schema, type Schema } from "../types/schema";
import {
  Stack,
  TextField,
  Paper,
  Typography,
  Button,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { INDIAN_STATES } from "../data/stateData";

export const Register = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
      }}
    >
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
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

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.gender}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup {...field} value={field.value ?? ""} row>
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <TextField
          {...register("dob")}
          label="Date of Birth"
          type="date"
          fullWidth
          error={!!errors.dob}
          helperText={errors.dob?.message}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { max: new Date().toISOString().split("T")[0] },
          }}
        />

        <TextField
          {...register("phone")}
          label="Phone Number"
          type="tel"
          fullWidth
          error={!!errors.phone}
          helperText={errors.phone?.message}
          slotProps={{
            htmlInput: {
              maxLength: 10,
            },
          }}
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

        <Controller
          name="stateCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""} // registers as controlled component
              select
              label="Select State"
              fullWidth
              error={!!errors.stateCode}
              helperText={errors.stateCode?.message}
            >
              {INDIAN_STATES.map((state) => (
                <MenuItem key={state.code} value={state.code}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isValid}
        >
          Sign Up
        </Button>
      </Stack>
    </Paper>
  );
};
