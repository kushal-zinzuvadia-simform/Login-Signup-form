import { z } from "zod";
import { patterns } from "../utils/Patterns";

export const schema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name is too short. At least 2 characters are expected",
    })
    .max(20, {
      message: "First name is too long. Max. 20 characters are allowed",
    }),

  lastName: z
    .string()
    .min(2, {
      message: "Last name is too short. At least 2 characters are expected",
    })
    .max(20, {
      message: "Last name is too long. Max. 20 characters are allowed",
    }),

  email: z.email().min(1, { message: "Email is required" }),

  address: z
    .string()
    .min(5, { message: "Address should be at least 5 characters long." })
    .max(50, { message: "Address should not be more than 50 characters long." })
    .refine((address) => patterns.address.test(address), {
      message: "Enter a valid Address.",
    }),

  city: z
    .string()
    .min(1, { message: "*Required" })
    .max(50, { message: "Address should not be more than 50 characters long." })
    .refine((address) => patterns.address.test(address), {
      message: "Enter a valid City.",
    }),
});

export type Schema = z.infer<typeof schema>;
