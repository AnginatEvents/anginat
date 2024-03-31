import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";

const Page = () => {
    return (
        <>
            <h1 className="text-3xl font-bold "> Forgot Password? </h1>
            <p className="pb-5 text-sm">
                Don&apos;t worry! It happens. Please enter the email associated
                with your account.{" "}
            </p>
            <ForgotPasswordForm />
        </>
    );
};

export default Page;