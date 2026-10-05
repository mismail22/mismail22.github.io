// Single place for personal details. Edit this file to update the hero,
// about section, contact links and SEO metadata.

export const site = {
  name: 'Mohanad Ismail',
  handle: 'mohanad',
  title: 'Mohanad Ismail · Engineering Leader, Infrastructure & Platforms',
  description:
    'Engineering leader with 16 years in large-scale infrastructure, 11 at Meta. Builds infrastructure organizations, reliability practices, and automation platforms that scale.',
  headline: 'Engineering leader building infrastructure organizations and platforms that scale.',
  focus: ['Infrastructure', 'Platforms', 'Reliability', 'Applied AI'],
  location: 'Menlo Park, CA',
  status: 'Open to infrastructure leadership roles',
  // Optional public email. Leave empty to keep it off the site.
  email: '' as string,
  // Path inside /public (e.g. 'resume.pdf'). Leave empty to hide the Resume buttons.
  resume: '' as string,
  // Create a free form at https://formspree.io and paste its ID (the part
  // after /f/). Messages go to your inbox without exposing your address.
  // The contact form stays hidden until this is set.
  formspreeId: '' as string,
  repo: 'https://github.com/mismail22/mismail22.github.io',

  socials: [
    { label: 'GitHub', handle: 'mismail22', href: 'https://github.com/mismail22', icon: 'github' },
    {
      label: 'LinkedIn',
      handle: 'mohanad-ismail-egy7',
      href: 'https://www.linkedin.com/in/mohanad-ismail-egy7',
      icon: 'linkedin',
    },
    // { label: 'X', handle: 'yourhandle', href: 'https://x.com/yourhandle', icon: 'x' },
  ],

  bio: [
    "I'm an engineering leader with 16 years in large-scale infrastructure, 11 of them at Meta. I grew a 5-person design team into a 24-engineer global infrastructure organization, then returned to hands-on technical leadership to architect the governance platform behind a $7B data-center fleet.",
    'My focus is where reliability, automation, and cost meet: SLO-driven operations, workflow platforms that remove manual toil, and vendor and capacity governance that holds up to finance scrutiny.',
    'I completed an MBA with Honors at Boston University Questrom in 2025, and I bring AI-native engineering practices (agentic workflows, RAG, LLM tooling) to how teams plan and ship.',
  ],

  stats: [
    { value: '16', label: 'years in infrastructure' },
    { value: '24', label: 'engineers in the org I built' },
    { value: '$7B', label: 'fleet under governance' },
    { value: '40%', label: 'vendor cost reduction' },
  ],

  education: [
    {
      school: 'Boston University, Questrom School of Business',
      degree: 'MBA, With Honors',
      period: '2024 – 2025',
      note: 'GPA 3.68. Analytics, strategic leadership, risk management. Top-5% finish in an international strategy simulation.',
    },
    {
      school: 'Cairo University',
      degree: 'B.Eng., Electronics & Telecommunications',
      period: '2003 – 2008',
    },
  ],
} as const;

export type SocialIcon = (typeof site.socials)[number]['icon'] | 'x';
