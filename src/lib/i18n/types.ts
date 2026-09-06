export interface Translation {
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    about: string;
    products: string;
    contact: string;
  };
  hero: {
    headline1: string;
    headline2: string;
    description: string;
    ctaProducts: string;
    ctaContact: string;
  };
  about: {
    sectionLabel: string;
    name: string;
    role: string;
    paragraphs: string[];
    valuesTitle: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  projects: {
    sectionLabel: string;
    sectionTitle: string;
    items: {
      title: string;
      description: string;
      tags: string[];
    }[];
  };
  contact: {
    sectionLabel: string;
    title: string;
    description: string;
    cta: string;
  };
  footer: {
    copyright: string;
  };
  notFound: {
    code: string;
    title: string;
    description: string;
    backHome: string;
  };
}
