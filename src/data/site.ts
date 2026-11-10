export const site = {
  name: 'Achraf Ouazzani Chahidi',
  handle: 'ACHUX21',
  bugcrowd: 'ACH21',
  role: 'Web security · CTF · bug bounty',
  location: 'Dalian, CN',
  zone: 'UTC+8',
  email: '21@achux.xyz',
  url: 'https://achux.xyz',
  line: 'Web bugs, CTF challenges, writeups. Dalian, from Casablanca.',
  description:
    'Web security in Dalian. CTFs with F1ux, bug bounty as ACH21, eJPTv2, and 28 writeups.',
  about:
    'I study computer science at Dalian Polytechnic University and work IT support there. Most of my time goes into web apps: auth, access control, injection, and whatever else a request can reach.',
  bountyIntro:
    'The program fixed it. Bugcrowd has not published the vulnerability class, so neither do I.',
  contact: 'Scope, a target, or a CTF team slot — send it.',
  quote: 'meow~ lost in the wired',
};

export type Layer = { id: string; n: string; name: string; path: string };

/** Section numbers and LAYER labels. One scheme, no repeated names. */
export const layers: Layer[] = [
  { id: 'top', n: '00', name: 'hero', path: '/' },
  { id: 'whoami', n: '01', name: 'whoami', path: '/whoami' },
  { id: 'record', n: '02', name: 'record', path: '/record' },
  { id: 'bugs', n: '03', name: 'bugs', path: '/bugs' },
  { id: 'work', n: '04', name: 'work', path: '/work' },
  { id: 'writeups', n: '05', name: 'writeups', path: '/writeups' },
  { id: 'contact', n: '06', name: 'contact', path: '/contact' },
];

export type NavLink = { label: string; href: string; id: string };

export const navLinks: NavLink[] = layers
  .filter((layer) => layer.id !== 'top')
  .map((layer) => ({ label: layer.path, href: `/#${layer.id}`, id: layer.id }));

export function hostOf(href: string): string {
  if (href.startsWith('mailto:')) return href.slice('mailto:'.length);
  try {
    return new URL(href).host;
  } catch {
    return '';
  }
}

export type OutLink = { label: string; href: string };

export const contactLinks: OutLink[] = [
  { label: 'GitHub', href: 'https://github.com/ACHUX21' },
  { label: 'Bugcrowd', href: 'https://bugcrowd.com/h/ACH21' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/achux21' },
  { label: 'F1ux', href: 'https://blog.f1ux.team/members/' },
  { label: 'CTFtime', href: 'https://ctftime.org/user/150843' },
  { label: 'Blog', href: 'https://blog.achux.xyz' },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/achux21' },
];
