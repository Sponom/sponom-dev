/** A decidable category in the phone prototype, with its option pool. */
export interface DeciderBucket {
  emoji: string;
  eyebrow: string;
  title: string;
  desc: string;
  pool: string[];
}

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
  decider: {
    comingSoonLabel: string;
    name: string;
    tagline: string;
    cta: string;
    metaTitle: string;
    introLabel: string;
    introTitle: string;
    introDescription: string;
    backHome: string;
    /** Interactive phone prototype strings. */
    prototype: {
      buckets: {
        eat: DeciderBucket;
        go: DeciderBucket;
        do: DeciderBucket;
      };
      enter: {
        title: string;
        sub: string;
        cta: string;
        foot: string;
      };
      hub: {
        title: string;
        sub: string;
      };
      back: string;
      gut: {
        spin: string;
        countdownLabel: string;
        redo: string;
      };
      bracket: {
        final: string;
        /** "{count}" is replaced with the number of contenders left. */
        round: string;
        vs: string;
      };
      blind: {
        hint: string;
        finalHint: string;
        cardBack: string;
        out: string;
        ruledOut: string;
        ruledOutSwitchHint: string;
        ruledOutMissHint: string;
        emptyYet: string;
        empty: string;
        lockIn: string;
      };
      weighted: {
        /** "{count}" is replaced with marbles left to spend. */
        left: string;
        roll: string;
        /** "{count}" is replaced with marbles in play. */
        inPlay: string;
      };
      result: {
        note: string;
        again: string;
        want: string;
      };
      coming: {
        eyebrow: string;
        title: string;
        sub: string;
        features: {
          icon: string;
          name: string;
          desc: string;
        }[];
        ctaTitle: string;
        ctaSub: string;
        emailPlaceholder: string;
        notify: string;
        doneWithEmailTitle: string;
        doneWithEmailSub: string;
        doneNoEmailTitle: string;
        doneNoEmailSub: string;
      };
    };
  };
  notFound: {
    code: string;
    title: string;
    description: string;
    backHome: string;
  };
}
