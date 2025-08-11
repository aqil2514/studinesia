import Image from "next/image";

export default function HeroSectionIllustration() {
  return (
    <div className="mx-auto">
      <Image
        src={"/images/hero-section.png"}
        alt="Hero section illustartion"
        width={560}
        height={560}
      />
    </div>
  );
}
