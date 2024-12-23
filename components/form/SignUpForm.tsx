"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// Form components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link.js";
import { PhoneInput } from "@/components/ui/phone-input";
import { signupSchema } from "@/schemas/signupSchema";
import { createUser } from "@/lib/db/dynamo_conn";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignUpProps {
    className?: string;
}

const SignUpForm: React.FC<SignUpProps> = ({ className }) => {
    const [signUpMessage, setSignUpMessage] = useState<signUpResponses>("");
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
        },
    });
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof signupSchema>) => {
        console.log("Attempting to sign up with", values);
        const response = await createUser({
            email: values.email,
            name: values.name,
            phone: values.phone,
            password: values.password,
        });
        if (response.success) {
            setSignUpMessage("Successfully Logged In");
            setTimeout(() => {
                router.push("/sign-in");
            });
        } else {
            if ((response.message = "Email already exists")) {
                setSignUpMessage("Email Already Exists");
                setTimeout(() => {
                    router.push("/sign-in");
                });
            } else {
                setSignUpMessage("Failed to create profile");
            }
        }
    };

    return (
        <div className={className}>
            <h1 className="pb-2 text-3xl font-bold"> Sign Up </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Your Email"
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
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PhoneInput
                                        placeholder="Phone Number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SignUpResponse message={signUpMessage} />
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full self-stretch"
                        >
                            Sign Up
                        </Button>
                    </div>
                    <div className="pr-3 text-right">
                        Already have an account?
                        <Link href="/sign-in" className="text-orange-600">
                            Log In
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

type signUpResponses =
    | "Successfully Logged In"
    | "Email Already Exists"
    | "Failed to create profile"
    | "";

const SignUpResponse = ({ message }: { message: signUpResponses }) => {
    switch (message) {
        case "Successfully Logged In":
            return (
                <div className="h-8 rounded-md bg-green-100 py-1 text-center text-green-600">
                    {message}
                </div>
            );
        case "Email Already Exists":
            return (
                <div className="h-8 rounded-md bg-yellow-100 py-1 text-center text-yellow-600">
                    {message}
                </div>
            );
        case "Failed to create profile":
            return (
                <div className="h-8 rounded-md bg-red-100 py-1 text-center text-red-600">
                    {message}
                </div>
            );
        default:
            return <div></div>;
    }
};

export default SignUpForm;
