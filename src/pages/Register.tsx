/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";

import { INDIAN_STATES } from "../data/stateData";
import { schema, type Schema } from "../types/schema";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    console.log("Form Submitted:", data);
    const { confirmPassword, ...user } = data;
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/login");
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
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup
                {...field}
                value={field.value ?? ""}
                row
                aria-labelledby="gender-label"
              >
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
              autoComplete: "tel",
            },
          }}
        />

        <TextField
          {...register("email")}
          label="Email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{
            htmlInput: { autoComplete: "email" },
          }}
        />

        <TextField
          {...register("address")}
          label="Address"
          fullWidth
          error={!!errors.address}
          helperText={errors.address?.message}
          slotProps={{
            htmlInput: { autoComplete: "street-address" },
          }}
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

        <TextField
          {...register("password")}
          type={showPassword ? "text" : "password"}
          label="Password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Controller
          name="termsAccepted"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.termsAccepted}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                }
                label={
                  <>I agree to the Privacy Policy and Terms & Conditions</>
                }
              />
              {errors.termsAccepted && (
                <FormHelperText>{errors.termsAccepted.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Button type="submit" variant="contained" size="large">
          Sign Up
        </Button>
      </Stack>
    </Paper>
  );
};
