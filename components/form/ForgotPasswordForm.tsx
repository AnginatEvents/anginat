"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoogleButton } from "@/components/ui/google-button";
import { Mail } from "lucide-react";

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

const formSchema = z.object({
    email: z.string().email(),
});

const ForgotForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Send otp to email");
        console.log(data);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative">
                                    <Mail className="text-gray-300 absolute top-1/2 left-1 -translate-y-1/2" />
                                    <Input
                                        className="px-8"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <Button
                        type="submit"
                        variant="default"
                        className="self-stretch w-full"
                    >
                        Send OTP
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ForgotForm;
