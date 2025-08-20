import HeroSectionIllustration from "@/components/atoms/images/HeroSectionIllustration";
import { greatVibes } from "@/config/fonts";
import Link from "next/link";

export default function HeroCard() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[url(/images/hero-background.jpg)] bg-cover bg-no-repeat">
      <HeroSectionIllustration />
      <div className="space-y-4 justify-center flex flex-col items-center">
        <Link
          href={"/"}
          className={`${greatVibes.className} text-8xl text-[#f6b737] bg-white/50 p-4 inline rounded-2xl`}
        >
          Studinesia
        </Link>
        <p className="mt-4 text-center">
          Segala sesuatu pasti ada ilmunya, untuk itulah Studinesia hadir!
        </p>
      </div>
    </section>
  );
}
