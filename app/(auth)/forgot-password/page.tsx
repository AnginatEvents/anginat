import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";

const Page = () => {
    return (
        <>
            <h1 className="font-bold text-3xl "> Forgot Password? </h1>
            <p className="text-sm pb-5">
                Don&apos;t worry! It happens. Please enter the email associated
                with your account.{" "}
            </p>
            <ForgotPasswordForm />
        </>
    );
};

export default Page;
