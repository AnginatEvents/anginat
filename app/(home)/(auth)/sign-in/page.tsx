import SignInForm from "@/components/form/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SignIn | Anginat",
    description: "Sign in to your account",
};

const SignIn = () => {
    return (
        <>
            <h1 className="pb-5 text-3xl font-bold"> Hi, Welcome 👋 </h1>
            <SignInForm />
        </>
    );
};

export default SignIn;
