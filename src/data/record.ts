export type Placement = {
  place: string;
  event: string;
  team: string;
  date: string;
  /** Team prize in Moroccan dirhams, when a figure was actually published. */
  prize?: string;
};

export const placements: Placement[] = [
  { place: '1st', event: 'MCSC v12 (INSEC ENSIAS)', team: 'PLOTONEA', date: 'Apr 2025', prize: '15,000 DH' },
  { place: '1st', event: 'IDEH v6 CTF (Akasec / CIT INPT)', team: 'PLOTONEA', date: 'Apr 2025', prize: '9,000 DH' },
  { place: '1st', event: 'AISEC CTF (ENSA / GCDSTE)', team: 'PLOTONEA', date: 'May 2025', prize: '16,000 DH' },
  {
    place: '2nd, open division',
    event: 'Cyber Odyssey 2024 (Akasec)',
    team: 'L3AK MA',
    date: 'Dec 2024',
    prize: '40,000 DH',
  },
  { place: '14th', event: 'HTB Cyber Apocalypse 2024: Hacker Royale', team: 'L3ak', date: '2024' },
];

export const prizeNote = 'Amounts are the team prize in Moroccan dirhams.';

export type Credit = {
  event: string;
  detail: string;
  note?: string;
  href?: string;
  hrefLabel?: string;
};

export const authored: Credit[] = [
  {
    event: 'L3akCTF 2024',
    detail: 'Co-authored the web challenge PEPE with S1mple.',
    note: 'Public writeup credit: “Authors: S1mple & Achux21”.',
    href: 'https://kashmir54.github.io/ctfs/L3akCTF2024/',
    hrefLabel: 'kashmir54 writeup',
  },
  {
    event: 'ISGI Casablanca / OFPPT',
    detail: 'Organized and built the challenges for the school CTF.',
  },
  {
    event: 'GCDSTE Secure Tech × 0xNox',
    detail:
      'Wrote and hosted the web challenges for the GCDSTE Secure Tech (ENSA Marrakech) × 0xNox CTF, Dec 2024.',
  },
];

export const firstBlood = {
  text: 'First blood on the rev challenge “tbarkallah 3lek awldi katchfi lghalil”.',
  href: 'https://blog.achux.xyz/posts/1337-local-ctf-tbarkallah/',
};

export type Team = {
  name: string;
  status: string;
  links?: { label: string; href: string }[];
};

export const teams: Team[] = [
  {
    name: 'F1ux',
    status: 'Current member, listed as ACHUX21 · Member',
    links: [
      { label: 'members', href: 'https://blog.f1ux.team/members/' },
      { label: 'CTFtime', href: 'https://ctftime.org/team/417727' },
    ],
  },
  { name: 'PLOTONEA', status: '2025 Moroccan national CTFs (3 wins)' },
  { name: 'L3AK MA', status: 'Cyber Odyssey 2024 line-up' },
  {
    name: 'L3ak',
    status: 'Former member (CTFtime roster)',
    links: [{ label: 'CTFtime', href: 'https://ctftime.org/team/220336' }],
  },
  {
    name: 'Akasec',
    status: 'Former member on CTFtime roster',
    links: [{ label: 'CTFtime', href: 'https://ctftime.org/team/107202' }],
  },
];

export type CtfRow = { year: string; place: string; event: string };

/**
 * Team ACHUX21 on CTFtime, newest first. Kept as the source for the event
 * count. The place-by-place log is not rendered.
 */
export const ctfLog: CtfRow[] = [
  { year: '2025', place: '759', event: 'V1t CTF 2025' },
  { year: '2025', place: '463', event: 'osu!gaming CTF 2025' },
  { year: '2025', place: '260', event: 'SunshineCTF 2025' },
  { year: '2025', place: '28', event: 'Pragyan CTF 2025' },
  { year: '2025', place: '240', event: 'TUCTF 2024' },
  { year: '2025', place: '239', event: 'Srdnlen CTF 2025 Quals' },
  { year: '2025', place: '720', event: 'UofTCTF 2025' },
  { year: '2024', place: '72', event: 'AirOverflow CTF 2024' },
  { year: '2024', place: '209', event: 'vikeCTF 2024' },
  { year: '2024', place: '573', event: 'Real World CTF 6th' },
  { year: '2024', place: '199', event: 'UofTCTF 2024' },
  { year: '2023', place: '867', event: 'SekaiCTF 2023' },
  { year: '2023', place: '629', event: 'AmateursCTF 2023' },
  { year: '2023', place: '85', event: 'aupCTF' },
  { year: '2023', place: '275', event: 'n00bzCTF 2023' },
  { year: '2023', place: '570', event: 'WaniCTF 2023' },
];

export const ctfTimeTeam = 'https://ctftime.org/team/225828';

/**
 * CTF events named in the writeups that are not already a placement
 * and not already a row in the ACHUX21 CTFtime log.
 * UofTCTF 2024 is in the log, so it is not repeated here.
 * HackTheBox machines, TryHackMe rooms, and Root-Me challenges are not events.
 * Authored events are listed separately and are not added here.
 */
export const writeupEventsBeyondLog = ['1337 Local CTF', 'PearlCTF 2025', 'USC-CTF 2024'];

export const ctfCount = new Set([
  ...ctfLog.map((row) => row.event),
  ...placements.map((row) => row.event),
  ...writeupEventsBeyondLog,
]).size;

export type Writeup = { title: string; date: string; href: string };

const post = (slug: string) => `https://blog.achux.xyz/posts/${slug}/`;

/** Surfaced ahead of the same-day 1337 Local set. */
export const writeupsLead: Writeup[] = [
  {
    title: 'PearlCTF 2025 — Tic-Tac-Toe: SSRF to Docker socket → container escape',
    date: '08 Mar 2025',
    href: post('pearlctf'),
  },
  {
    title: 'UofTCTF 2024 — FFmpeg command injection & web cache deception',
    date: '14 Jan 2024',
    href: post('uoftctf'),
  },
];

export const writeups: Writeup[] = [
  {
    title: 'USC-CTF 2024 — Spooky Query Leaks: SQLite3 injection via UPSERT',
    date: '02 Nov 2024',
    href: post('usc-spookyql'),
  },
  { title: 'Root-Me — JWT unsecure file signature', date: '20 Feb 2024', href: post('jwt-unsecure-file-signature') },
  { title: 'Root-Me — SQL/NoSQL set', date: '22 Jan 2024', href: post('sql-nosql-root-me') },
  { title: 'HackTheBox — Topology', date: '01 Mar 2024', href: post('topology') },
  { title: 'HackTheBox — C.O.P', date: '15 Jan 2024', href: post('cop') },
  { title: 'HackTheBox — TwoMillion', date: '10 Aug 2023', href: post('twomillion') },
  { title: 'TryHackMe — Red', date: '07 Jul 2023', href: post('red') },
  { title: 'TryHackMe — Cat Pictures 2', date: '03 Jul 2023', href: post('cat-pictures-2') },
  { title: 'HackTheBox — Sau', date: '09 Jul 2023', href: post('sau') },
  { title: 'HackTheBox — Pilgrimage', date: '25 Jun 2023', href: post('pilgrimage') },
];

export const localCtfWriteups: Writeup[] = [
  { title: '1337 Local CTF — Baby-AES', date: '27 Jun 2026', href: post('1337-local-ctf-baby-aes') },
  { title: '1337 Local CTF — baby overflow', date: '27 Jun 2026', href: post('1337-local-ctf-baby-overflow') },
  { title: '1337 Local CTF — BASIT', date: '27 Jun 2026', href: post('1337-local-ctf-basit') },
  { title: '1337 Local CTF — big brother', date: '27 Jun 2026', href: post('1337-local-ctf-big-brother') },
  { title: '1337 Local CTF — Encrypted Callback', date: '27 Jun 2026', href: post('1337-local-ctf-encrypted-callback') },
  { title: '1337 Local CTF — holy bytes hh', date: '27 Jun 2026', href: post('1337-local-ctf-holy-bytes-hh') },
  { title: '1337 Local CTF — intro to zk', date: '27 Jun 2026', href: post('1337-local-ctf-intro-to-zk') },
  { title: '1337 Local CTF — July pool 2024', date: '27 Jun 2026', href: post('1337-local-ctf-july-pool-2024') },
  { title: '1337 Local CTF — MOL TAXI', date: '27 Jun 2026', href: post('1337-local-ctf-mol-taxi') },
  { title: '1337 Local CTF — new intra', date: '27 Jun 2026', href: post('1337-local-ctf-new-intra') },
  { title: '1337 Local CTF — Notebook', date: '27 Jun 2026', href: post('1337-local-ctf-notebook') },
  { title: '1337 Local CTF — numbA thiri', date: '27 Jun 2026', href: post('1337-local-ctf-numba-thiri') },
  { title: '1337 Local CTF — ret2win', date: '27 Jun 2026', href: post('1337-local-ctf-ret2win') },
  { title: '1337 Local CTF — shellcode', date: '27 Jun 2026', href: post('1337-local-ctf-shellcode') },
  { title: '1337 Local CTF — tbarkallah (first blood)', date: '27 Jun 2026', href: post('1337-local-ctf-tbarkallah') },
  { title: '1337 Local CTF — The BOSS', date: '27 Jun 2026', href: post('1337-local-ctf-the-boss') },
];

export const writeupCount = writeupsLead.length + writeups.length + localCtfWriteups.length;

export type Bounty = {
  program: string;
  severity: string;
  award: string;
  asset?: string;
  state?: string;
  accepted?: string;
  profile?: string;
  profileLabel?: string;
  source?: string;
  sourceLabel?: string;
  note?: string;
};

export const bounties: Bounty[] = [
  {
    program: 'Viator (Bugcrowd)',
    asset: 'https://supplier.viator.com/',
    severity: 'High',
    award: '$2,150 USD',
    state: 'Resolved',
    accepted: '10 Aug 2026',
    profile: 'https://bugcrowd.com/h/ACH21',
    profileLabel: 'bugcrowd.com/h/ACH21',
    source: 'https://bugrater.com/activity/262',
    sourceLabel: 'bugrater.com/activity/262',
    note: 'BugRater notes this is the largest award Viator has published there.',
  },
  {
    program: 'Undisclosed Moroccan company',
    severity: 'P4',
    award: '$150 USD',
    note: 'Unpublished. The company name is not shared.',
  },
];

export const facts: { key: string; value: string; href?: string }[] = [
  { key: 'loc', value: 'Dalian, CN · from Morocco' },
  { key: 'study', value: 'BSc Computer Science, Dalian Polytechnic University (2025–2029)' },
  { key: 'school', value: 'Diploma, Cyber Security, ISGI Casablanca (2023 to 2025)' },
  { key: 'work', value: 'IT Support Specialist, DPU (Apr 2026–)' },
  { key: 'prev', value: 'Junior Penetration Tester, Swift IT, Casablanca (Jan–Mar 2025)' },
  {
    key: 'cert',
    value: 'eJPTv2 · INE · ID 89951440 · valid to Dec 2026',
    href: 'https://certs.ine.com/b1e71810-8c7d-45d1-a860-0766446b8171',
  },
  { key: 'team', value: 'F1ux', href: 'https://blog.f1ux.team/members/' },
];
