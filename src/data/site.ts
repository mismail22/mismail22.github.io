// Single place for personal details. Edit this file to update the hero,
// MBA section, contact links and SEO metadata. Longer lists live in the
// JSON files next to this one.

export const site = {
  name: 'Mohanad Ismail',
  handle: 'mohanad',
  title: 'Mohanad Ismail · Engineering Leader, Infrastructure & Platforms',
  description:
    'Engineering leader with 16 years in large-scale infrastructure, 11 at Meta. Grew a 5-person team into a 24-engineer global organization and built the governance platform behind a $7B data-center fleet. MBA with Honors.',
  // Hero headline, split so the second half can be de-emphasized.
  headline: ['I build engineering organizations,', 'and the infrastructure platforms they run.'],
  intro:
    '16 years in large-scale infrastructure, 11 at Meta. I grew a 5-person team into a 24-engineer global organization, then returned to hands-on technical leadership to architect the governance platform behind a $7B data-center fleet.',
  location: 'Menlo Park, CA',
  status: 'Open to infrastructure leadership roles',

  // Hero status bar. `to` is animated; `from` is shown before an arrow.
  heroTelemetry: [
    { label: 'Org', from: '5', to: 24, suffix: ' eng' },
    { label: 'Fleet', prefix: '$', to: 7, suffix: 'B' },
    { label: 'Avail', to: 99, suffix: '%' },
    { label: 'Vendor cost', prefix: '−', to: 40, suffix: '%' },
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

  mba: {
    school: 'Boston University, Questrom School of Business',
    degree: 'Master of Business Administration',
    honors: 'With Honors',
    period: '2024 – 2025',
    gpa: '3.68',
    note: 'Led a 5-person team to a top-5% finish in an international country-manager strategy simulation.',
    coursework: ['Analytics', 'Strategic leadership', 'Risk management', 'Global business'],
    // How the business training shows up in engineering work.
    applied: [
      { value: '$5M → ~$3M', label: 'Annual budget after a multi-vendor RFP, with no SLA regression' },
      { value: '$100–200M', label: 'Trapped capital unlocked by automating fleet disposition' },
      { value: 'SOX', label: 'Compliant governance platform built with finance as a partner' },
      { value: '1,000+', label: 'Lab environments under ongoing capacity and cost governance' },
    ],
    toolkit: ['P&L and budget ownership', 'Vendor strategy and negotiation', 'Capacity and cost governance', 'Risk management', 'Analytics', 'Cross-functional partnership'],
  },

  education: [
    {
      school: 'Boston University, Questrom School of Business',
      degree: 'MBA, With Honors',
      period: '2024 – 2025',
    },
    {
      school: 'Cairo University',
      degree: 'B.Eng., Electronics & Telecommunications',
      period: '2003 – 2008',
    },
  ],
} as const;

export type SocialIcon = (typeof site.socials)[number]['icon'] | 'x';
