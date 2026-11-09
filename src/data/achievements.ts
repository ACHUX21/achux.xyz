export const headlineStats = [
  { value: '3×', label: '1st place' },
  { value: '$2,150', label: 'bounty' },
  { value: 'P2', label: 'valid' },
  { value: '20+', label: 'CTFs' },
];

export const bounty = {
  program: 'Bugcrowd',
  name: 'Viator',
  asset: 'supplier.viator.com',
  severity: 'P2 / High',
  status: 'Resolved',
  accepted: 'Aug 2026',
  reward: '$2,150',
  summary:
    'Valid P2 / high finding on supplier.viator.com. Accepted August 2026, rewarded $2,150, and marked resolved. The issue is not disclosed.',
  links: [
    { label: 'Bugcrowd profile', href: 'https://bugcrowd.com/h/ACH21' },
    { label: 'Activity record', href: 'https://bugrater.com/activity/262' },
  ],
  badges: ['4 valid web-app findings', 'Submission Shogun L1', 'Bounty Bee L1'],
};

export type Shot = { file: string; alt: string };

export type Win = {
  id: string;
  place: string;
  event: string;
  team: string;
  year?: string;
  tone: 'gold' | 'silver' | 'bronze';
  proof?: string;
  /** Filenames in src/assets/achievements/. First image is the card cover. */
  images: Shot[];
};

export const wins: Win[] = [
  {
    id: 'mcscv12',
    place: '1st',
    event: 'MCSCv12',
    team: 'Plotonea',
    year: '2025',
    tone: 'gold',
    proof:
      'https://www.linkedin.com/posts/achux21_thrilled-to-announce-that-my-team-plotonea-activity-7315364987802181632-oE2Q',
    images: [
      { file: 'mcscv12.webp', alt: 'Group photo from the MCSCv12 first-place post, with Plotonea holding the check.' },
      { file: 'mcscv12-team.webp', alt: 'Plotonea with the MCSCv12 first-place check.' },
      { file: 'mcscv12-scoreboard.webp', alt: 'MCSCv12 scoreboard with Plotonea in first place.' },
    ],
  },
  {
    id: 'idehv6',
    place: '1st',
    event: 'IDEHv6',
    team: 'Plotonea',
    year: '2025',
    tone: 'gold',
    proof:
      'https://www.linkedin.com/posts/achux21_ctf-idehv6-cybersecurity-activity-7317330449813434368-UEIG',
    images: [
      { file: 'idehv6.webp', alt: 'IDEHv6 first-place poster of Plotonea with medals and a check.' },
    ],
  },
  {
    id: 'aisec',
    place: '1st',
    event: 'AISEC CTF',
    team: 'Plotonea',
    year: '2025',
    tone: 'gold',
    proof:
      'https://www.linkedin.com/posts/achux21_aisec-plotonea-ensa-activity-7328603377989283841-kvJF',
    images: [
      { file: 'aisec.webp', alt: 'AISEC 2025 first-place winner check made out to Plotonea.' },
      { file: 'aisec-scoreboard.webp', alt: 'AISEC scoreboard with the Plotonea team in first place.' },
      { file: 'aisec-venue.webp', alt: 'AISEC CTF venue with event banners.' },
      { file: 'aisec-award.webp', alt: 'AISEC 2025 award check on a table during the ceremony.' },
    ],
  },
  {
    id: 'cyber-odyssey',
    place: '2nd',
    event: 'Cyber Odyssey',
    team: 'Akasec',
    year: '2024',
    tone: 'silver',
    proof:
      'https://www.linkedin.com/posts/achux21_cyberodysseyctf-cybersecurity-ctf-activity-7275583744646807554-FbPH',
    images: [
      { file: 'cyber-odyssey.webp', alt: 'Akasec players in Cyber Odyssey 2024 jerseys.' },
      { file: 'cyber-odyssey-playing.webp', alt: 'A Cyber Odyssey player at a laptop during the event.' },
      { file: 'cyber-odyssey-check.webp', alt: 'Akasec with the Cyber Odyssey second-place check.' },
      { file: 'cyber-odyssey-certificate.webp', alt: 'Cyber Odyssey 2024 certificate for Achraf Ouazzani Chahidi.' },
    ],
  },
  {
    id: 'htb-apocalypse',
    place: 'Top 15',
    event: 'HTB Cyber Apocalypse',
    team: 'L3ak',
    tone: 'bronze',
    images: [{ file: 'htb-cyber-apocalypse.webp', alt: 'HTB Cyber Apocalypse placement.' }],
  },
];

export const credentials = [
  {
    kicker: 'Current team',
    title: 'F1ux',
    detail: '#3 China on CTFtime, 2026',
    href: 'https://ctftime.org/team/417727/',
  },
  {
    kicker: 'Certification',
    title: 'eJPTv2',
    detail: 'Web Security Specialist',
  },
  {
    kicker: 'Organizer',
    title: 'ISGI Casablanca',
    detail: 'CTF event · Jun 2025 · certificate of appreciation',
  },
];
