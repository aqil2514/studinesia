import { IconType } from "react-icons";

export interface BasicIcons {
  Icon: IconType;
  link: string;
}

export interface IconsWithLabel extends BasicIcons {
  label: string;
}
