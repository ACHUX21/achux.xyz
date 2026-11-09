import { experiments } from './experiments';
import { profiles } from './site';

export type Command = {
  id: string;
  group: 'Sections' | 'Experiments' | 'Links';
  label: string;
  hint?: string;
  href: string;
};

export const commands: Command[] = [
  { id: 'top', group: 'Sections', label: 'Hero', hint: 'Top', href: '#top' },
  { id: 'subject', group: 'Sections', label: 'Subject file', hint: 'Bio', href: '#subject' },
  { id: 'log', group: 'Sections', label: 'Experiment log', hint: 'EXP-001', href: '#log' },
  { id: 'ctf', group: 'Sections', label: 'CTF & achievements', href: '#ctf' },
  { id: 'skills', group: 'Sections', label: 'Skills', href: '#skills' },
  { id: 'writeups', group: 'Sections', label: 'Writeups', hint: 'blog.achux.xyz', href: '#writeups' },
  { id: 'contact', group: 'Sections', label: 'Contact', href: '#contact' },
  ...experiments.map(
    (exp): Command => ({
      id: exp.id.toLowerCase(),
      group: 'Experiments',
      label: exp.name,
      hint: `${exp.id} · ${exp.status}`,
      href: `#${exp.id.toLowerCase()}`,
    }),
  ),
  { id: 'resume', group: 'Links', label: 'Resume', hint: 'PDF', href: profiles.resume },
  { id: 'github', group: 'Links', label: 'GitHub', hint: 'ACHUX21', href: profiles.github },
  { id: 'email', group: 'Links', label: 'Email', hint: '21@achux21.com', href: 'mailto:21@achux21.com' },
  { id: 'linkedin', group: 'Links', label: 'LinkedIn', href: profiles.linkedin },
  { id: 'ctftime', group: 'Links', label: 'CTFtime', hint: 'user/150843', href: profiles.ctftime },
  { id: 'thm', group: 'Links', label: 'TryHackMe', href: profiles.tryhackme },
  { id: 'blog', group: 'Links', label: 'Blog', hint: 'blog.achux.xyz', href: profiles.blog },
  { id: 'bugcrowd', group: 'Links', label: 'Bugcrowd', hint: 'ACH21', href: profiles.bugcrowd },
  { id: 'f1ux', group: 'Links', label: 'F1ux on CTFtime', hint: 'Current team', href: profiles.f1ux },
  {
    id: 'viator',
    group: 'Links',
    label: 'Viator activity record',
    hint: 'EXP-001',
    href: 'https://bugrater.com/activity/262',
  },
];
