"use client";
import { signIn } from "next-auth/react";
import MainContainer from "@/components/layouts/Container/MainContainer";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

export default function LoginTemplate() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      switch (error) {
        case "AccessDenied":
          toast.error("Akses ditolak. Anda tidak memiliki izin.");
          break;
        case "CredentialsSignin":
          toast.error("Email atau password salah.");
          break;
        default:
          toast.error("Terjadi kesalahan saat login.");
      }
    }
  }, [error]);

  return (
    <MainContainer className="flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl font-bold">Login</h1>
      <div className="w-1/2 bg-slate-200 p-8 rounded-full text-center">
        <GoogleLogin />
      </div>
    </MainContainer>
  );
}

const GoogleLogin = () => {
  return (
    <Button variant={"outline"} size={"lg"} onClick={() => signIn("google")}>
      <FaGoogle /> Login With Google
    </Button>
  );
};
