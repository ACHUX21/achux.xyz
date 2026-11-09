export type Placement = {
  place: string;
  event: string;
  year?: string;
  team?: string;
  proof?: { label: string; href: string };
};

export const placements: Placement[] = [
  {
    place: '1st',
    event: 'MCSCv12',
    year: '2025',
    team: 'Plotonea',
    proof: {
      label: 'Proof',
      href: 'https://www.linkedin.com/posts/achux21_thrilled-to-announce-that-my-team-plotonea-activity-7315364987802181632-oE2Q',
    },
  },
  {
    place: '1st',
    event: 'IDEHv6',
    year: '2025',
    proof: {
      label: 'Proof',
      href: 'https://www.linkedin.com/posts/achux21_ctf-idehv6-cybersecurity-activity-7317330449813434368-UEIG',
    },
  },
  {
    place: '1st',
    event: 'AISEC CTF',
    year: '2025',
    proof: {
      label: 'Proof',
      href: 'https://www.linkedin.com/posts/achux21_aisec-plotonea-ensa-activity-7328603377989283841-kvJF',
    },
  },
  {
    place: '2nd',
    event: 'Cyber Odyssey',
    year: '2024',
    team: 'Akasec',
  },
  {
    place: 'Top 15',
    event: 'HTB Cyber Apocalypse',
    team: 'L3ak',
  },
];

export type Team = { name: string; href?: string; current?: boolean };

export const teams: Team[] = [
  { name: 'F1ux', href: 'https://ctftime.org/team/417727', current: true },
  { name: 'Akasec' },
  { name: 'L3ak' },
  { name: 'Plotonea' },
];

export type CtfLink = { label: string; href: string };

export const ctfLinks: CtfLink[] = [
  { label: 'CTFtime profile', href: 'https://ctftime.org/user/150843' },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/achux21' },
  { label: 'Writeups', href: 'https://blog.achux.xyz' },
];

export const stats = [
  { value: '3', label: '1st-place wins' },
  { value: '28', label: 'Writeups published' },
  { value: '20+', label: 'CTF events played' },
];
