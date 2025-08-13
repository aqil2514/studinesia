import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  values: string[];
  setValues: Dispatch<SetStateAction<string[]>>;
}

export default function InputTags({ setValues, values }: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const addHandler = () => {
    setValues([...values, inputValue]);
    setInputValue("");
  };

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addHandler();
    }
  };

  const deleteHandler = (index: number) => {
    const selectedValue = values[index];
    const newValues = values.filter((value) => value !== selectedValue);
    setValues(newValues);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {values.length > 0 ? (
          values.map((value, index) => (
            <Button
              key={index + 1}
              type="button"
              variant={"outline"}
              onClick={() => deleteHandler(index)}
            >
              {value}
            </Button>
          ))
        ) : (
          <span className="text-gray-500">Belum memiliki tags</span>
        )}
      </div>
      <Input
        onKeyDown={keyDownHandler}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Tag ketik di sini"
      />
    </div>
  );
}
