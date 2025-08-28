"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface Props {
  maxPage?: number;
}

export default function PaginationViaSearchParams({ maxPage }: Props) {
  const searchParams = useSearchParams();
  const initPage = searchParams.get("page");
  const currentParams = new URLSearchParams(searchParams.toString());

  const [page, setPage] = useState<number>(
    initPage && !isNaN(Number(initPage)) ? Number(initPage) : 1
  );
  const router = useRouter();

  useEffect(() => {
    if (page <= 0) {
      currentParams.set("page", "1");
      router.replace(`?${currentParams.toString()}`, { scroll: false });
      setPage(1);
    }

    if (maxPage) {
      if (page > maxPage) {
        router.replace(`?${currentParams.toString()}`, { scroll: false });
        setPage(maxPage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, router, maxPage]);

  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const value = (e.target as HTMLInputElement).valueAsNumber;
    if (!isNaN(value) && value > 0) {
      setPage(value);
      currentParams.set("page", String(value));
      router.replace(`?${currentParams.toString()}`, { scroll: false });
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setPage(target.valueAsNumber);
  };

  const backHandler = () => {
    const newValue = page - 1;
    setPage(newValue);
    currentParams.set("page", String(newValue));
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  const nextHandler = () => {
    const newValue = page + 1;
    setPage(newValue);
    currentParams.set("page", String(newValue));

    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={backHandler}
        disabled={page <= 1}
      >
        {" "}
        <BiLeftArrow />{" "}
      </Button>
      <Input
        type="number"
        inputMode="text"
        value={page}
        className="w-14 text-center"
        onKeyDown={keydownHandler}
        onChange={changeHandler}
        aria-label="Page Number"
      />
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={nextHandler}
        disabled={maxPage ? page >= maxPage : false}
        aria-label="Next Page"
      >
        <BiRightArrow />{" "}
      </Button>
    </div>
  );
}
