import { IconType } from "react-icons";
export interface BasicNavigation {
  label: string;
  url: string;
  roles?: string;
}

export interface NavigationWithIcon extends BasicNavigation {
  Icon: IconType;
  ActionIcon?: IconType;
  actionUrl?: string;
}

export interface BasicOption {
  value: string;
  label: string;
}
