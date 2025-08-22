import Divider from "@/components/atoms/divider/Divider";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  query: string;
}

export default function SearchHeader({ query }: Props) {
  const [q, setQ] = useState<string>(query);
  return (
    <header className="space-y-4">
      <form action="search">
        <Input
          className="w-[520px] mx-auto bg-white"
          name="q"
          value={q}
          placeholder="Cari Artikel..."
          onChange={(e) => setQ(e.target.value)}
        />
      </form>
      <h1 className="text-center font-bold text-2xl">
        Hasil Pencarian untuk &quot;{query}&quot;
      </h1>
      <Divider />
    </header>
  );
}
