"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoogleButton } from "@/components/ui/google-button";
import { login } from "@/actions/login";
import { useTransition } from "react";

// Form components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link.js";
import { loginSchema } from "@/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInForm = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        console.log({ values });
        startTransition(async () => {
            const { email, password } = values;
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            console.log({ response });
            if (!response?.error) {
                setSuccess("You have successfully signed in.");
                setTimeout(() => {
                    router.push("/dashboard");
                }, 500);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={pending}
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={pending}
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full self-stretch"
                        disabled={pending}
                    >
                        Sign In
                    </Button>
                </div>
                <div className="pr-3 text-right">
                    <Link href="/forgot-password" className="text-orange-600">
                        Forgot password?
                    </Link>
                </div>
                <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                    or
                </div>
            </form>
            <div className="pt-4">
                <GoogleButton />
            </div>
            <div className="pt-3">
                Don&apos;t have an account?{" "}
                <Button className="px-1 font-semibold" variant="link" asChild>
                    <Link href="/sign-up">Sign Up</Link>
                </Button>
            </div>
        </Form>
    );
};

export default SignInForm;
