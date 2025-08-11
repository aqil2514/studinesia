import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MainLogoProps {
  withLinks?: string;
}
export default function MainLogo({ withLinks }: MainLogoProps) {
  if (withLinks) return <LogoWithLinks links={withLinks} />;
  
  return (
    <Image
      src={"/images/main-logo.png"}
      alt="Main logo icons"
      width={180}
      height={60}
    />
  );
}

const LogoWithLinks: React.FC<{ links: string }> = ({ links }) => {
  return (
    <Link href={links}>
      <Image
        src={"/images/main-logo.png"}
        alt="Main logo icons"
        width={180}
        height={60}
      />
    </Link>
  );
};
