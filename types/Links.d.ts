export interface BasicLink {
  href: string;
  label: string;
}

export interface BasicHeaderLinks {
  href: string;
  label: string;
}

export interface BasicHeader {
  links: { link: string; label: string }[];
}
