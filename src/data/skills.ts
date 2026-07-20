export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    category: 'Offensive Security',
    items: ['Penetration Testing', 'Web App Security (OWASP)', 'Vulnerability Research', 'Exploit Dev', 'CTF'],
  },
  {
    category: 'Tooling & Recon',
    items: ['Burp Suite', 'nmap', 'sqlmap', 'ProjectDiscovery', 'CVE research'],
  },
  {
    category: 'Languages',
    items: ['Python', 'C', 'Bash', 'TypeScript', 'JavaScript'],
  },
  {
    category: 'Backend',
    items: ['Flask', 'FastAPI', 'SQLAlchemy', 'JWT', 'SQLite / MSSQL', 'Redis'],
  },
  {
    category: 'Frontend',
    items: ['Astro', 'React', 'Svelte', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'DevOps',
    items: ['Docker', 'nginx', 'GitHub Actions', 'Cloudflare', 'Vercel'],
  },
];
