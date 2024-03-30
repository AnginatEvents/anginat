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
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/ui/phone-input";

const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
        .string()
        .min(6, { message: "Password needs to be atleast 6 characters long" }),
    phone: z
        .string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

interface SignUpProps {
    className?: string;
}

const SignUpForm: React.FC<SignUpProps> = ({ className }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Attempting to sign in with", values);
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
                                <FormMessage />
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
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full self-stretch"
                        >
                            Sign In
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

export default SignUpForm;
