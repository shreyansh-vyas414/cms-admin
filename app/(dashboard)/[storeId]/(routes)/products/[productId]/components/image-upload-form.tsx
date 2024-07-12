"use client";

import { FileUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result);
  };

  console.log('value', value)
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                className="bg-transparent hover:none"
                onClick={() => onRemove(url)}
                variant={"outline"}
              >
                <Trash className="h-4 w-4 text-white hover:text-black" fill="#000" />
              </Button>
            </div>
              <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <FileUpload
        endpoint="productImage"
        onChange={(url) => {
          if (url) {
            onUpload(url);
          }
        }}
      />
    </div>
  );
};

export default ImageUpload;
