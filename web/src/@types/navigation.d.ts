export interface BasicNavigation {
  link: string;
  label: string;
}

export interface NavigationWithBackground extends BasicNavigation {
  backgroundColor: string;
}

export interface NavigationWithImage extends BasicNavigation {
  imageUrl: string;
  subTitleLabel?: string;
}
