// Single place for personal details. Edit this file to update the hero,
// contact links and SEO metadata. Longer lists live in the JSON files next to
// this one, and case studies live in src/content/work/.

export const site = {
  name: 'Mohanad Ismail',
  handle: 'mohanad',
  role: 'Tech Lead · Infrastructure Platforms & Automation · Meta',
  title: 'Mohanad Ismail · Infrastructure Platforms & Network Automation',
  description:
    'Network and infrastructure engineer, 16 years, 11 at Meta. Architected the real-time platform governing a multi-billion-dollar data-center rack inventory, automated network changes across backbone, edge and lab networks, and grew an R&D infrastructure team from 5 to 24.',
  // Hero headline, split so the second half can be de-emphasized.
  headline: ['I turn risky, manual infrastructure work', 'into guarded, automated systems.'],
  intro:
    'Network and infrastructure engineer, 16 years, 11 at Meta. I architected the real-time platform governing a multi-billion-dollar data-center rack inventory, automated network changes across backbone, edge, and lab networks, and earlier grew an R&D infrastructure team from 5 to 24 people. MBA (Honors), Boston University.',
  location: 'Menlo Park, CA',
  status: 'Open to Staff+ IC & infra EM roles',

  // Hero "Track record" bar. `to` is animated; `from` is shown before an arrow.
  heroTelemetry: [
    { label: 'Years in infra', to: 16 },
    { label: 'Racks swept', to: 27000, suffix: '+' },
    { label: 'Disposal cycle', from: '81', to: 10, suffix: 'd' },
    { label: 'Team built', from: '5', to: 24 },
  ],
  stack: ['Python', 'Hack/PHP', 'SQL', 'GraphQL/React', 'BGP', 'Workflow orchestration', 'LLM agents'],

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

  // Team section
  teamPrinciples: [
    {
      title: 'Build the operating model before the headcount.',
      body: 'Before growing from 5 to 24, I defined onboarding, role boundaries, escalation paths, and the hiring bar for a mix of FTEs, contractors, and MSP partners.',
    },
    {
      title: 'Shared ownership beats escalation.',
      body: 'A long-running incident-ownership conflict ended with a shared charter across network, network-security, and infra-security teams; partner engagement went from 37% to 83%.',
    },
  ],
  teamProof: [
    { value: '96.85%', label: 'repair SLA vs 95% target' },
    { value: '90%+', label: 'MTTR improvement, year one' },
    { value: '382', label: 'lab deployments in six months' },
    { value: '10 → 3', label: 'days to resolve help requests' },
    { value: '+43%', label: 'devices at flat headcount' },
    { value: '37 → 83%', label: 'partner incident engagement' },
  ],
  teamNotes: ['Promoted a direct report into a lab-operations lead role', 'Mentored 4 engineers through complex technical designs', '19 behavioral interview loops'],
  teamClosing:
    'In 2024 I moved into a hands-on tech-lead role to architect the fleet platform, while completing an MBA with Honors (2025).',

  education: [
    {
      school: 'Boston University, Questrom School of Business',
      degree: 'MBA, With Honors',
      period: '2024 – 2025',
      note: 'GPA 3.68 · analytics, strategic leadership, risk management · led a team to a top-5% finish in an international strategy simulation',
    },
    {
      school: 'Cairo University',
      degree: 'B.Eng., Electronics & Telecommunications',
      period: '2003 – 2008',
    },
  ],

  humanNote: 'Off the keyboard: ranked 12th at the 2016 Windsurfing World Championship.',
} as const;

export type SocialIcon = (typeof site.socials)[number]['icon'] | 'x';
