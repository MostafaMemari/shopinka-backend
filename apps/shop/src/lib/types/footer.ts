export interface MenuLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
}

export interface TrustBadge {
  id: string;
  name: string;
  imageSrc: string;
  href: string;
  isTest?: boolean;
}
