"use client";

import toast from "react-hot-toast";

import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    // <UploadDropzone
    //   endpoint={endpoint}
    //   onClientUploadComplete={(res) => {
    //     onChange(res?.[0].url);
    //   }}
    //   onUploadError={(error: Error) => {
    //     console.log("error:", error);
    //     toast.error(`${error?.message}`);
    //   }}
    // />
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={(res: string | any) => {
        onChange(res);
      }}
      appearance={{
        button: {
          backgroundColor: "#000000",
        },
        container: {
          alignItems: "baseline",
        },
      }}
      onUploadError={(error: Error) => {
        console.log("error:", error);
        toast.error(`${error?.message}`);
      }}
    />
  );
};
