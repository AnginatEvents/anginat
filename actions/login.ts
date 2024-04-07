"use server";
import { loginSchema } from "@/schemas/loginSchema";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
    // Validating on the server side is safer becausing valitaion on the login form can be bypassed
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    return { success: "Sent!" };
};
