import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";

export const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
        .string()
        .min(6, { message: "Password needs to be atleast 6 characters long" }),
    phone: z
        .string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});
