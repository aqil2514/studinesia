"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NewsletterDialog from "../dialogs/NewsletterDialog";
import { useState } from "react";
import { toast } from "sonner";
import { subscribe } from "@/lib/api-client/newsletter.api";
import { z } from "zod";

export default function NewsletterForm() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const subscribeHandler = async () => {
    const parsedEmail = z
      .email("Alamat email salah")
      .min(1, "Email wajib diisi")
      .safeParse(email);
    if (!parsedEmail.success) {
      toast.error(parsedEmail.error.issues[0].message);
      return;
    }

    const { message, success } = await subscribe(name, parsedEmail.data);
    if (!success) return toast.error(message ?? "Terjadi kesalahan");

    setEmail("");
    setName("");
    setOpenDialog(false);

    return toast.success(message ?? "Berhasil");
  };

  return (
    <>
      <section className="max-w-sm p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Berlangganan Studinesia</h3>
        <p className="text-sm mb-4 text-gray-600">
          Dapatkan update artikel dan tips langsung di email Anda.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenDialog(true);
          }}
          className="flex flex-col space-y-4"
        >
          {/* Input Nama */}
          <div>
            <Label htmlFor="name" className="sr-only">
              Nama
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda"
              required
            />
          </div>

          {/* Input Email */}
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Daftar
          </Button>
        </form>
      </section>

      <NewsletterDialog
        onOpenChange={setOpenDialog}
        open={openDialog}
        name={name}
        email={email}
        subscribeHandler={subscribeHandler}
      />
    </>
  );
}
