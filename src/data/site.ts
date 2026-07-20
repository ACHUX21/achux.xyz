export const site = {
  name: 'Achraf Ouazzani Chahidi',
  handle: 'ACHUX21',
  role: 'Web Security Specialist',
  headline: 'Web Security Specialist · eJPT certified',
  location: 'Dalian, China',
  origin: 'Morocco',
  email: '21@achux21.com',
  url: 'https://achux.xyz',
  taglines: [
    'Break it to understand how to defend it.',
    'From recon to root — every chain documented.',
    'Offensive security · web · CTF.',
  ],
  bio: `Web security specialist and cybersecurity student from Morocco, currently studying at Dalian Polytechnic University. I focus on offensive security — penetration testing, web application security, vulnerability research, and CTF. I play with the Moroccan team Akasec and build security tooling and full-stack web apps on the side.`,
  facts: [
    'From Morocco 🇲🇦 · based in Dalian 🇨🇳',
    'Dalian Polytechnic University',
    'eJPTv2 certified',
    'CTF player @ Akasec',
  ],
};

export type Social = {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'ctftime' | 'tryhackme' | 'mail' | 'rss';
};

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/ACHUX21', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/achux21', icon: 'linkedin' },
  { label: 'CTFtime', href: 'https://ctftime.org/user/150843', icon: 'ctftime' },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/achux21', icon: 'tryhackme' },
  { label: 'Email', href: 'mailto:21@achux21.com', icon: 'mail' },
];
