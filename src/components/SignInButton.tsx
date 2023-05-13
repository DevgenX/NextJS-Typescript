"use client";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import Button from "./ui/Button";
import { toast } from "./ui/Toast";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (err) {
      toast({
        title: "Error Signing In",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={handleSignInWithGoogle} isLoading={isLoading}>
      SignIn
    </Button>
  );
};
export default SignInButton;
