export type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  repo?: string;
  live?: string;
  private?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: 'packguard',
    tagline: 'Supply-chain malware scanner',
    description:
      'Scans npm & PyPI packages for malicious code using local AI (Ollama), static analysis, and typosquatting detection — fully offline, no cloud.',
    tags: ['Python', 'Ollama', 'Static Analysis', 'Security'],
    repo: 'https://github.com/ACHUX21/packguard',
    featured: true,
  },
  {
    name: 'CTF-Archive',
    tagline: 'Self-hostable CTF platform',
    description:
      'Flask web app for browsing archived CTF challenges, tracking events, writing writeups, and managing progress — with search, social messaging, bookmarks, and solves.',
    tags: ['Flask', 'SQLAlchemy', 'JWT', 'SocketIO', 'Redis'],
    private: true,
    featured: true,
  },
  {
    name: 'checker-CVE-2024-6387',
    tagline: 'regreSSHion scanner',
    description:
      'Concurrent scanner that checks hosts for the OpenSSH regreSSHion vulnerability (CVE-2024-6387). Supports IPs, domains, and CIDR ranges with version exclusion.',
    tags: ['Python', 'CVE', 'Threading'],
    repo: 'https://github.com/ACHUX21/checker-CVE-2024-6387',
    featured: true,
  },
  {
    name: 'Daily Chinese',
    tagline: 'HSK Mandarin-learning PWA',
    description:
      'Full-stack PWA with spaced-repetition (FSRS), grammar notes, mock exams, an AI tutor, and a leaderboard. React + FastAPI, containerized.',
    tags: ['React', 'FastAPI', 'TypeScript', 'PWA', 'Docker'],
    private: true,
  },
  {
    name: 'Gemi-Bot',
    tagline: 'AI Discord bot',
    description:
      'Gemini-powered Discord bot that manages servers, channels, and members through natural-language commands.',
    tags: ['Python', 'discord.py', 'Gemini'],
    private: true,
  },
  {
    name: 'blog.achux.xyz',
    tagline: 'Security & CTF writeups',
    description:
      'My blog of security research and CTF writeups — HackTheBox, TryHackMe, Root-Me, and competition challenges.',
    tags: ['Astro', 'Svelte', 'Tailwind'],
    repo: 'https://github.com/ACHUX21/blog.achux.xyz',
    live: 'https://blog.achux.xyz',
  },
];
