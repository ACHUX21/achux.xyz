export type ExperimentLink = { label: string; href: string };

export type Experiment = {
  id: string;
  name: string;
  kicker: string;
  status: 'RESOLVED' | 'SHIPPED' | 'PRIVATE' | 'PUBLISHED';
  severity?: string;
  date?: string;
  reward?: string;
  hypothesis: string;
  method: string;
  impact: string;
  tags: string[];
  links: ExperimentLink[];
};

export const experiments: Experiment[] = [
  {
    id: 'EXP-001',
    name: 'Viator',
    kicker: 'Bugcrowd · supplier.viator.com',
    status: 'RESOLVED',
    severity: 'P2',
    date: '2026-08',
    reward: '$2,150',
    hypothesis:
      'Was there a valid high-severity issue on supplier.viator.com, inside Viator’s Bugcrowd scope?',
    method:
      'Reported through the Bugcrowd program. The vulnerability itself is not disclosed.',
    impact:
      'Accepted in August 2026 as a valid P2 / high finding. Rewarded $2,150. Status resolved.',
    tags: ['Bugcrowd', 'Web'],
    links: [
      { label: 'Bugcrowd profile', href: 'https://bugcrowd.com/h/ACH21' },
      { label: 'Activity record', href: 'https://bugrater.com/activity/262' },
    ],
  },
  {
    id: 'EXP-002',
    name: 'packguard',
    kicker: 'Supply-chain malware scanner',
    status: 'SHIPPED',
    hypothesis:
      'Malicious npm and PyPI packages can be screened on the machine that is about to install them.',
    method:
      'Scans packages with local AI (Ollama), static analysis, and typosquatting detection — fully offline, no cloud.',
    impact: 'A supply-chain malware scanner that does not send the package to a third party.',
    tags: ['Python', 'Ollama', 'Static Analysis', 'Security'],
    links: [{ label: 'Code', href: 'https://github.com/ACHUX21/packguard' }],
  },
  {
    id: 'EXP-003',
    name: 'checker-CVE-2024-6387',
    kicker: 'regreSSHion scanner',
    status: 'SHIPPED',
    hypothesis:
      'Hosts can be checked for the OpenSSH regreSSHion vulnerability (CVE-2024-6387) across an address range.',
    method:
      'Concurrent scanner for IPs, domains, and CIDR ranges, with version exclusion.',
    impact: 'A coverage check for CVE-2024-6387.',
    tags: ['Python', 'CVE', 'Threading'],
    links: [{ label: 'Code', href: 'https://github.com/ACHUX21/checker-CVE-2024-6387' }],
  },
  {
    id: 'EXP-004',
    name: 'CTF-Archive',
    kicker: 'Self-hostable CTF platform',
    status: 'PRIVATE',
    hypothesis: 'Archived challenges, events, writeups, and solve progress belong in one self-hosted app.',
    method:
      'Flask web app with search, social messaging, bookmarks, and solves. SQLAlchemy, JWT, SocketIO, and Redis.',
    impact: 'A private place to browse archived CTF challenges and track events.',
    tags: ['Flask', 'SQLAlchemy', 'JWT', 'SocketIO', 'Redis'],
    links: [],
  },
  {
    id: 'EXP-005',
    name: 'Daily Chinese',
    kicker: 'HSK Mandarin-learning PWA',
    status: 'PRIVATE',
    hypothesis: 'HSK study can live in one app: reviews, grammar, exams, and a tutor.',
    method:
      'Full-stack PWA with spaced repetition (FSRS), grammar notes, mock exams, an AI tutor, and a leaderboard. React and FastAPI, containerized.',
    impact: 'A private Mandarin-learning app.',
    tags: ['React', 'FastAPI', 'TypeScript', 'PWA', 'Docker'],
    links: [],
  },
  {
    id: 'EXP-006',
    name: 'Gemi-Bot',
    kicker: 'AI Discord bot',
    status: 'PRIVATE',
    hypothesis: 'Routine Discord administration can be driven with natural-language commands.',
    method: 'Gemini-powered Discord bot built with discord.py.',
    impact: 'Manages servers, channels, and members through conversation. Private.',
    tags: ['Python', 'discord.py', 'Gemini'],
    links: [],
  },
  {
    id: 'EXP-007',
    name: 'blog.achux.xyz',
    kicker: 'Security & CTF writeups',
    status: 'PUBLISHED',
    hypothesis: 'Solved challenges are more useful once the path is written down.',
    method: 'Astro and Svelte site for security research and CTF writeups, styled with Tailwind.',
    impact:
      'Public notes on HackTheBox, TryHackMe, Root-Me, and competition challenges.',
    tags: ['Astro', 'Svelte', 'Tailwind'],
    links: [
      { label: 'Live', href: 'https://blog.achux.xyz' },
      { label: 'Code', href: 'https://github.com/ACHUX21/blog.achux.xyz' },
    ],
  },
];
