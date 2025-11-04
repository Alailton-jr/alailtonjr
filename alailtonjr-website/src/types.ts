export type LinkItem = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  repo?: string;
  link?: string;
  image?: string;
};

export type Experience = {
  org: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  notes?: string;
};

export type Publication = {
  title: string;
  authors?: string;
  venue: string;
  year: string;
  volume?: string;
  link?: string;
};

export type Profile = {
  name: string;
  headline: string;
  location?: string;
  email?: string;
  phone?: string;
  bio?: string;
  citizenship?: string;
  languages?: string;
  links?: LinkItem[];
};
