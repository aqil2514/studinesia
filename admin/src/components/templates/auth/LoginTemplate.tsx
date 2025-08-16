import { signIn } from "@/auth";
import MainContainer from "@/components/layouts/Container/MainContainer";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

export default function LoginTemplate() {
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
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant={"outline"} size={"lg"}>
        <FaGoogle /> Login With Google
      </Button>
    </form>
  );
};
