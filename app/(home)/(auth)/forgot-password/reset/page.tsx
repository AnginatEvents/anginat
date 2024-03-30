import ResetPasswordForm from "@/components/form/ResetPasswordForm";

const Page = () => {
    return (
        <>
            <h1 className="text-3xl font-bold "> Reset Password </h1>
            <p className="pb-5 text-sm">
                Please type something you&apos;ll remember.
            </p>
            <ResetPasswordForm />
        </>
    );
};

export default Page;
