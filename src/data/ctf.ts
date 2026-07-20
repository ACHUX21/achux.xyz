export type Achievement = { place: string; event: string; year: string; medal?: '🥇' | '🥈' | '🥉' };

export const achievements: Achievement[] = [
  { place: '1st place', event: 'MCSCv12 · IDEHv6 · AISEC CTF', year: '2025', medal: '🥇' },
  { place: '2nd place', event: 'Cyber Odyssey', year: '2024', medal: '🥈' },
  { place: 'Top 15', event: 'HTB Cyber Apocalypse (Team L3ak)', year: '' },
];

export const teams = ['Akasec', 'L3ak'];

export type CtfLink = { label: string; href: string };

export const ctfLinks: CtfLink[] = [
  { label: 'CTFtime profile', href: 'https://ctftime.org/user/150843' },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/achux21' },
  { label: 'Writeups →', href: 'https://blog.achux.xyz' },
];

export const stats = [
  { value: '13+', label: 'Writeups published' },
  { value: '3', label: '1st-place wins' },
  { value: '20+', label: 'CTF events played' },
];
