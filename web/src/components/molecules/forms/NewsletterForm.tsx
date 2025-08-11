"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewsletterForm() {
  return (
    <section className="max-w-sm p-6 bg-white rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Berlangganan Studinesia</h3>
      <p className="text-sm mb-4 text-gray-600">
        Dapatkan update artikel dan tips finansial langsung di email Anda.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Terima kasih sudah berlangganan!");
        }}
        className="flex flex-col space-y-4"
      >
        <div>
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Masukkan email Anda"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Daftar
        </Button>
      </form>
    </section>
  );
}
