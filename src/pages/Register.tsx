import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
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
      elevation={4}
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: 4,
        p: { xs: 3, md: 4 },
        borderRadius: 4,
      }}
    >
      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Typography variant="h4" align="center">
            Create Account
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("firstName")}
              label="First Name"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("lastName")}
              label="Last Name"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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

                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("dob")}
              label="Birth Date"
              type="date"
              fullWidth
              error={!!errors.dob}
              helperText={errors.dob?.message}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: {
                  max: new Date().toISOString().split("T")[0],
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("phone")}
              label="Contact Number"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("email")}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("city")}
              label="City"
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="stateCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  select
                  label="State"
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
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              {...register("address")}
              label="Address"
              multiline
              rows={2}
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label="Password"
              fullWidth
              error={!!errors.password}
              helperText={
                errors.password?.message ??
                "Must contain letters, numbers and a special character"
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>

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
                label="I agree to the Privacy Policy and Terms & Conditions"
              />

              <FormHelperText>{errors.termsAccepted?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Create Account
        </Button>

        <Typography variant="body2" align="center" color="text.secondary">
          Already a member?{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            Login here
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};
