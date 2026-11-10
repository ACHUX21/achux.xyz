export const site = {
  name: 'Achraf Ouazzani Chahidi',
  handle: 'ACHUX21',
  bugcrowd: 'ACH21',
  role: 'Web security · CTF · bug bounty',
  location: 'Dalian, CN',
  zone: 'UTC+8',
  email: '21@achux.xyz',
  url: 'https://achux.xyz',
  tagline: 'Break it to understand how to defend it.',
  line: 'Web security. CTFs with F1ux. Bugcrowd as ACH21.',
  status: 'eJPTv2 · 3 national CTF wins · $2,150 high on Viator · 21@achux.xyz',
  about:
    'Moroccan, living in Dalian. I study computer science at Dalian Polytechnic University and work IT support there. Most of my time goes into web apps: auth, access control, injection, and whatever else a request can reach. I hold eJPTv2. I play CTFs with F1ux and write up what I solve — 28 posts so far.',
  recordIntro:
    'Three first places in 2025 with PLOTONEA. Second in the Cyber Odyssey 2024 open division with L3AK MA. Full CTFtime log below.',
  bountyIntro:
    'One published finding so far. The program fixed it; Bugcrowd has not published details, so neither do I.',
  contact: '21@achux.xyz. Scope, a target, or a CTF team slot — send it.',
  footer: 'close the world · open the nExt',
  quote: 'meow~ lost in the wired',
};

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: 'whoami', href: '#whoami' },
  { label: 'record', href: '#record' },
  { label: 'bounty', href: '#bounty' },
  { label: 'work', href: '#work' },
  { label: 'stack', href: '#stack' },
  { label: 'contact', href: '#contact' },
];

export type OutLink = { label: string; href: string };

export const contactLinks: OutLink[] = [
  { label: '21@achux.xyz', href: 'mailto:21@achux.xyz' },
  { label: 'Resume', href: '/resume.pdf' },
  { label: 'GitHub', href: 'https://github.com/ACHUX21' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/achux21' },
  { label: 'CTFtime', href: 'https://ctftime.org/user/150843' },
  { label: 'Bugcrowd', href: 'https://bugcrowd.com/h/ACH21' },
  { label: 'F1ux', href: 'https://blog.f1ux.team/members/' },
  { label: 'Blog', href: 'https://blog.achux.xyz' },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/achux21' },
];
