"use client";

import { FC, useState } from "react";
import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignOutUser = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (err) {
      toast({
        title: "Error Signing out",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={handleSignOutUser} isLoading={isLoading}>
      Sign out
    </Button>
  );
};
export default SignOutButton;
