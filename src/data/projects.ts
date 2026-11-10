export type Project = {
  name: string;
  blurb: string;
  stack: string;
  repo?: string;
  live?: string;
  private?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: 'packguard',
    blurb:
      'Scans npm and PyPI packages before install. Static analysis, typosquat checks, and a local Ollama model. Nothing leaves the machine.',
    stack: 'Python, Ollama, static analysis',
    repo: 'https://github.com/ACHUX21/packguard',
    featured: true,
  },
  {
    name: 'checker-CVE-2024-6387',
    blurb:
      'Checks OpenSSH hosts for regreSSHion (CVE-2024-6387). Takes IPs, domains, or CIDR ranges. Threaded, with version exclusion.',
    stack: 'Python, threading',
    repo: 'https://github.com/ACHUX21/checker-CVE-2024-6387',
  },
  {
    name: 'CTF-Archive',
    blurb:
      'Flask app for archived CTF challenges: search, solves, bookmarks, writeups, chat. Private repo. No public demo.',
    stack: 'Flask, SQLAlchemy, JWT, Socket.IO, Redis',
    private: true,
  },
  {
    name: 'blog.achux.xyz',
    blurb:
      '28 writeups. HackTheBox, TryHackMe, Root-Me, and CTFs including 1337 Local CTF, PearlCTF, UofTCTF, USC-CTF.',
    stack: 'Astro, Svelte, Tailwind',
    repo: 'https://github.com/ACHUX21/blog.achux.xyz',
    live: 'https://blog.achux.xyz',
  },
];
