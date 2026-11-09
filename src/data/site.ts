export const site = {
  name: 'Achraf Ouazzani Chahidi',
  handle: 'ACHUX21',
  role: 'Web Security Specialist',
  headline: 'Web Security Specialist · eJPTv2',
  location: 'Dalian, China',
  origin: 'Morocco',
  email: '21@achux21.com',
  url: 'https://achux.xyz',
  tagline: 'Break it to understand how to defend it.',
  taglines: [
    'Break it to understand how to defend it.',
    'From recon to root — every chain documented.',
    'Offensive security · web · CTF.',
  ],
  bio: `Web security specialist and cybersecurity student from Morocco, currently studying at Dalian Polytechnic University. I focus on offensive security — penetration testing, web application security, vulnerability research, and CTF. I play with the Moroccan team Akasec and build security tooling and full-stack web apps on the side.`,
  facts: [
    'From Morocco · based in Dalian',
    'Dalian Polytechnic University',
    'eJPTv2 certified',
    'CTF player @ Akasec',
  ],
  status: {
    team: 'F1ux',
    activity: 'hunting on Bugcrowd',
    place: 'Dalian',
  },
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

export const profiles = {
  github: 'https://github.com/ACHUX21',
  linkedin: 'https://linkedin.com/in/achux21',
  ctftime: 'https://ctftime.org/user/150843',
  tryhackme: 'https://tryhackme.com/p/achux21',
  blog: 'https://blog.achux.xyz',
  bugcrowd: 'https://bugcrowd.com/h/ACH21',
  f1ux: 'https://ctftime.org/team/417727',
  resume: '/resume.pdf',
};
