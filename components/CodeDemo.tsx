"use client";
import { useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleCheckBig, CircleX, TriangleAlert } from "lucide-react";
import { useSession } from "next-auth/react";

type CodeResultType = "success" | "failure" | "alreadyChecked" | null;

const CodeDemo = () => {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<CodeResultType>(null);
    const [checkedTimes, setCheckedTimes] = useState<number>(0);
    const session = useSession();

    function onSumbit() {
        // cant be bothered setting up zod here ResidentSleeper
        if (code === "") {
            return;
        }
        const formData = new FormData();
        formData.append("code", code);
        axios
            .post(`/api/check-code/${session.data?.user?.id}`, formData)
            .then((res) => {
                setCheckedTimes(res.data.checked);
                if (res.data.checked > 0) {
                    setStatus("alreadyChecked");
                    setCheckedTimes(res.data.checked);
                } else {
                    setStatus("success");
                }
            })
            .catch((error) => {
                setStatus("failure");
            });
    }

    return (
        <Card className="shadow-s w-[350px] hover:shadow-xl">
            {status === null ? (
                <>
                    <CardHeader className="items-center">
                        <CardTitle>Authenticaion Demo</CardTitle>
                        <CardDescription>
                            Let&apos;s check your code
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="code">Code</Label>
                                    <Input
                                        id="code"
                                        placeholder="Enter the Verification Code"
                                        value={code}
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={onSumbit} className="w-full">
                            Submit
                        </Button>
                    </CardFooter>
                </>
            ) : (
                <CodeResult result={status} checkedTimes={checkedTimes} />
            )}
        </Card>
    );
};

function CodeResult({
    result,
    checkedTimes,
}: {
    result: CodeResultType;
    checkedTimes?: number;
}) {
    const messages = {
        header: {
            success: "Authentication Successful!",
            alreadyChecked: "Already Checked!",
            failure: "Authentication Failed!",
        },
        body: {
            success: "Congratulations! Your code is legitimate",
            alreadyChecked: `Oops! Seems like you have already checked your code ${checkedTimes} times.`,
            failure: "Your code is not legitimate or something went wrong.",
        },
        icons: {
            success: (
                <CircleCheckBig
                    size={100}
                    strokeWidth={0.75}
                    className=" pt-4 text-green-500"
                />
            ),
            alreadyChecked: (
                <TriangleAlert
                    size={100}
                    strokeWidth={0.75}
                    className=" pt-4 text-yellow-500"
                />
            ),
            failure: (
                <CircleX
                    size={100}
                    strokeWidth={0.75}
                    className=" pt-4 text-red-500"
                />
            ),
        },
    };
    // Just to fix the type error, ideally this should never happen since the form is being rendered when status is null
    if (result === null) {
        return null;
    }

    return (
        <>
            <CardContent className="flex flex-col items-center justify-center gap-3">
                {messages.icons[result]}
                <div className="text-center text-3xl font-semibold">
                    {messages.header[result]}
                </div>
                <div className="text-center">{messages.body[result]}</div>
            </CardContent>
        </>
    );
}

export default CodeDemo;
