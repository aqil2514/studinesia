import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { FcAddImage } from "react-icons/fc";

interface Props {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

export default function ImagePicker({ file, setFile }: Props) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <Label
        htmlFor="image-select"
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-500 focus-within:border-blue-500 transition-colors"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            height={128}
            width={128}
            className="object-cover rounded-md mb-4"
          />
        ) : (
          <FcAddImage className="w-12 h-12 mb-4 text-gray-400" />
        )}
        <span className="font-medium text-gray-700">
          {file ? file.name : "Klik untuk pilih gambar"}
        </span>
        <span className="text-xs text-gray-500 mt-1">
          Format: JPEG, PNG, WEBP (max 2MB)
        </span>
        <Input
          type="file"
          className="hidden"
          id="image-select"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
        />
      </Label>
    </div>
  );
}
