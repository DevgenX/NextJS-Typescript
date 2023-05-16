"use client";
import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import Button from "@/ui/Button";
import { Loader2 } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { toast } from "@/ui/Toast";
import { createApiKey } from "@/helpers/create-api-key";
import { revokeApiKey } from "@/helpers/revoke-api-key";
import { useRouter } from "next/navigation";

interface ApiKeyOptionsProps {
  apiKeys: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeys }) => {
  const router = useRouter();

  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);

  const createNewApiKey = async () => {
    setIsCreatingNew(true);

    try {
      await revokeApiKey();
      await createApiKey();
      toast({
        title: "Create API Key",
        message: "Successfully created API key",
        type: "success",
      });
      router.refresh();
    } catch (err) {
      toast({
        title: "Failed to create API key",
        message: "Please try again after 1 min",
        type: "error",
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeKeys = async () => {
    setIsRevoking(true);
    try {
      await revokeApiKey();
      toast({
        title: "Revoke API Key",
        message: "Successfully revoked API key",
        type: "success",
      });
      router.refresh();
    } catch (err) {
      toast({
        title: "Failed to revoke API key",
        message: "Please try again after 1 min",
        type: "error",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant={"ghost"} className="flex gap-2 items-center">
          <p>
            {isCreatingNew
              ? "Creating new key..."
              : isRevoking
              ? "Revoking key..."
              : "Options"}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeys);

            toast({
              title: "Copied",
              message: "API Key copied to clipboard",
              type: "success",
            });
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create API Key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeKeys}>Revoke API Key</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
