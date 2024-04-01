import SignUpForm from "@/components/form/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SignUp | Anginat",
    description: "Sign up for a new account",
};

const Page = () => {
    return <SignUpForm />;
};

export default Page;
