export type Writeup = {
  date: string;
  title: string;
  summary: string;
  href: string;
};

const post = (slug: string) => `https://blog.achux.xyz/posts/${slug}/`;

/** Titles, dates, and summaries taken from the public blog feed. */
export const writeups: Writeup[] = [
  {
    date: '2026-06-27',
    title: '1337 Local CTF: Baby-AES — Known Plaintext → Tiny Keyspace',
    summary:
      'Recovering a 9-byte AES key by using the known flag format and a known plaintext/ciphertext pair.',
    href: post('1337-local-ctf-baby-aes'),
  },
  {
    date: '2026-06-27',
    title: '1337 Local CTF: holy bytes hh — Timing Side Channel',
    summary: 'Extracting a flag bit-by-bit from a deliberate timing leak in a Python loop.',
    href: post('1337-local-ctf-holy-bytes-hh'),
  },
  {
    date: '2026-06-27',
    title: '1337 Local CTF: intro to zk — Broken Fiat-Shamir Binding',
    summary:
      "Forging a Sigma protocol proof because the verifier's challenge is constant and not bound to the commitment.",
    href: post('1337-local-ctf-intro-to-zk'),
  },
  {
    date: '2025-03-08',
    title: 'PearlCTF 2025 — Tic-Tac-Toe: SSRF to Docker Socket → Container Escape',
    summary:
      'Exploiting a Server-Side Request Forgery vulnerability to access the Docker Engine API, spawning a privileged container with host filesystem mount to read the flag.',
    href: post('pearlctf'),
  },
  {
    date: '2024-03-01',
    title: 'Topology (HackTheBox): LaTeX Injection → Local File Read',
    summary:
      'Exploiting a LaTeX injection vulnerability in a web application to read local files and gain initial access to the system.',
    href: post('topology'),
  },
  {
    date: '2023-06-25',
    title: 'Pilgrimage (HackTheBox): Git Exposure → ImageMagick CVE-2022-44268 → PrivEsc',
    summary:
      'Discovering an exposed .git repository, exploiting ImageMagick arbitrary file read (CVE-2022-44268) to steal credentials, and escalating privileges via a vulnerable system binary.',
    href: post('pilgrimage'),
  },
];

export const writeupCount = 28;
