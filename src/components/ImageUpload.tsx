"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40">
        <img src={value} alt="Upload" className="rounded-md size-40 object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
     <main className="flex flex-col items-center justify-between p-24">
    <UploadButton
    className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
      appearance={{
    button:
      "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
    container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
    allowedContent:
      "flex h-8 flex-col items-center justify-center px-2 text-white",
  }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
    </main>
  );
}
export default ImageUpload;