import { ContactIcons } from "@/components/atoms/icons/ContactIcons";
import { SocialMediaIcons } from "@/components/atoms/icons/SocialMediaIcons";
import MainLogo from "@/components/atoms/images/MainLogo";
import { Separator } from "@/components/ui/separator";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ContactLinks from "@/components/molecules/navigations/ContactNavigations";
import SocialMediaLinks from "@/components/molecules/navigations/SocialMediaNavigations";
import Link from "next/link";

export default function DesktopNavbar() {
  return (
    <header className="hidden md:block">
      <section className="flex justify-between bg-gray-200 px-8">
        <ContactLinks ContactIcons={ContactIcons} />
        <SocialMediaLinks icons={SocialMediaIcons} />
      </section>
      <section className="flex justify-around">
        <MainLogo withLinks="/" />
        <Navigation />
      </section>
      <Separator />
    </header>
  );
}

const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={"/"}>Beranda</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={"/articles"}>Artikel</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
