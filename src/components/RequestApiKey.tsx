"use client";

import { FC, FormEvent, useState } from "react";
import { createApiKey } from "@/helpers/create-api-key";
import { Key } from "lucide-react";

import { toast } from "@/ui/Toast";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import CopyButton from "@/components/CopyButton";
import { Input } from "@/ui/Input";
import Button from "@/ui/Button";

const RequestApiKey: FC = ({}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  //typing default behavior
  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);
    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Error",
          message: e.message,
          type: "error",
        });
      }
      toast({
        title: "Error",
        message: "Failed to create API key",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading>Request API Key</LargeHeading>
        <Paragraph>You haven&apos;t created your API key yet.</Paragraph>
      </div>
      <form
        onSubmit={createNewApiKey}
        className="mt-6 sm:flex sm:items-center"
        action="#"
      >
        <div className="relative rounded-md shadow-dm sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              type="button"
              valueToCopy={apiKey}
              className="absolute inset-y-0 right- animate-in fade-in duration-300"
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key ..."
          />
        </div>
        <div className="mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0 ">
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
