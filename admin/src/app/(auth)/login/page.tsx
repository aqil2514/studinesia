import LoginTemplate from "@/components/templates/auth/LoginTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  return <LoginTemplate />;
}
