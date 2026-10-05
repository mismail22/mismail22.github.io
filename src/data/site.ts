// Single place for personal details. Edit this file to update the hero,
// contact links and SEO metadata. Longer lists live in the JSON files next to
// this one, and case studies live in src/content/work/.

export const site = {
  name: 'Mohanad Ismail',
  handle: 'mohanad',
  title: 'Mohanad Ismail · Infrastructure Platforms & Network Automation',
  description:
    '16 years in network and infrastructure engineering, 11 at Meta. Architected the governance platform for $7B+ in data-center rack assets, automated network policy across thousands of devices, and grew an R&D infrastructure team from 5 to 24.',
  // Hero headline, split so the second half can be de-emphasized.
  headline: ['I build infrastructure platforms and network automation,', "and I've built the team that runs them."],
  intro:
    '16 years in network and infrastructure engineering, 11 at Meta. I architected the governance platform for $7B+ in data-center rack assets, automated network policy across thousands of devices, and grew an R&D infrastructure team from 5 to 24 engineers.',
  location: 'Menlo Park, CA',
  status: 'Open to Staff+ infrastructure and infrastructure engineering-management roles',

  // Hero status bar: three systems readouts, one team readout.
  // `to` is animated; `from` is shown before an arrow.
  heroTelemetry: [
    { label: 'Rack assets', prefix: '$', to: 7, suffix: 'B+' },
    { label: 'Net changes', to: 162 },
    { label: 'Cycle', from: '81', to: 10, suffix: 'd' },
    { label: 'Org', from: '5', to: 24 },
  ],

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
    { label: 'LinkedIn', handle: 'mohanad-ismail-egy7', href: 'https://www.linkedin.com/in/mohanad-ismail-egy7', icon: 'linkedin' },
    { label: 'GitHub', handle: 'mismail22', href: 'https://github.com/mismail22', icon: 'github' },
    // { label: 'X', handle: 'yourhandle', href: 'https://x.com/yourhandle', icon: 'x' },
  ],

  // Team section extras
  teamNotes: ['Promoted a direct report into a lab-operations lead role', 'Mentored 4 engineers through complex technical designs', '19 behavioral interview loops'],

  education: [
    {
      school: 'Boston University, Questrom School of Business',
      degree: 'MBA, With Honors',
      period: '2024 – 2025',
      note: 'GPA 3.68 · Analytics, strategic leadership, risk management · Led a team to a top-5% finish in an international strategy simulation',
    },
    {
      school: 'Cairo University',
      degree: 'B.Eng., Electronics & Telecommunications',
      period: '2003 – 2008',
    },
  ],
} as const;

export type SocialIcon = (typeof site.socials)[number]['icon'] | 'x';
