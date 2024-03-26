import ResetPasswordForm from "@/components/form/ResetPasswordForm";

const Page = () => {
    return (
        <>
            <h1 className="font-bold text-3xl "> Reset Password </h1>
            <p className="text-sm pb-5">
                Please type something you&apos;ll remember.
            </p>
            <ResetPasswordForm />
        </>
    );
};

export default Page;
