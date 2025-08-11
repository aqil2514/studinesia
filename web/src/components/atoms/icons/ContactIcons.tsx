import { IconsWithLabel } from "@/@types/icons";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

export const ContactIcons: IconsWithLabel[] = [
  {
    Icon: FaPhoneAlt,
    label: "+62 0123456789",
    link: "#",
  },
  {
    Icon: MdOutlineMail,
    label: "coming-soon@example.com",
    link: "#",
  },
  {
    Icon: IoLocation,
    label: "location in street bla bla bla",
    link: "#",
  },
];
