import { IconsWithLabel } from "@/@types/icons";
import { baseEmailUrl, baseWhatsAppUrl } from "@/config/baseUrl";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

export const ContactIcons: IconsWithLabel[] = [
  {
    Icon: FaPhoneAlt,
    label: "+62 85693273746",
    link: baseWhatsAppUrl,
  },
  {
    Icon: MdOutlineMail,
    label: "info@studinesia.io",
    link: baseEmailUrl,
  },
  {
    Icon: IoLocation,
    label: "Indonesia",
    link: "#",
  },
];
