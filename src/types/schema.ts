import { z } from "zod";
import { patterns } from "../utils/Patterns";
import { INDIAN_STATES } from "../data/stateData";

export const schema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name is too short. At least 2 characters are expected",
    })
    .max(20, {
      message: "First name is too long. Max. 20 characters are allowed",
    })
    .regex(/^[a-zA-Z]+$/, "Name must contain only alphabets"),

  lastName: z
    .string()
    .min(2, {
      message: "Last name is too short. At least 2 characters are expected",
    })
    .max(20, {
      message: "Last name is too long. Max. 20 characters are allowed",
    })
    .regex(/^[a-zA-Z]+$/, "Name must contain only alphabets"),

  gender: z.enum(["Male", "Female"], {
    message: "Please select a gender",
  }),

  dob: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Enter a valid date of birth" },
    )
    .refine(
      (val) => {
        return new Date(val) < new Date();
      },
      { message: "Date of birth must be in the past" },
    ),

  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d{10}$/, "Phone number must contain only digits"),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .check(z.email({ message: "Enter a valid email address" })),

  address: z
    .string()
    .min(5, { message: "Address should be at least 5 characters long." })
    .max(50, { message: "Address should not be more than 50 characters long." })
    .refine((address) => patterns.address.test(address), {
      message: "Enter a valid Address.",
    }),

  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(30, { message: "City should not be more than 30 characters long." })
    .refine((city) => patterns.city.test(city), {
      message: "Enter a valid City.",
    }),

  stateCode: z
    .string()
    .min(1, { message: "Please select a state" })
    .refine((val) => INDIAN_STATES.some((state) => state.code === val), {
      message: "Invalid state selected",
    }),
});

export type Schema = z.infer<typeof schema>;
