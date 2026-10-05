// Single place for personal details. Edit this file to update the hero,
// contact links and SEO metadata. Longer lists live in the JSON files next to
// this one, and case studies live in src/content/work/.

export const site = {
  name: 'Mohanad Ismail',
  handle: 'mohanad',
  role: 'Tech Lead · Infrastructure Platforms & Automation · Meta',
  title: 'Mohanad Ismail · Infrastructure Platforms & Network Automation',
  description:
    'Network and infrastructure engineer, 16 years, 11 at Meta. Architected the governance platform for a multi-billion-dollar data-center rack inventory, automated network changes across backbone, edge and lab networks, and grew an R&D infrastructure team from 5 to 24.',
  // Hero headline, split so the second half can be de-emphasized.
  headline: ['I turn risky, manual infrastructure work', 'into guarded, automated systems.'],
  intro:
    'Network and infrastructure engineer, 16 years, 11 at Meta. I architected the governance platform for a multi-billion-dollar data-center rack inventory, automated network changes across backbone, edge, and lab networks, and earlier grew an R&D infrastructure team from 5 to 24 people. MBA (Honors), Boston University.',
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
      body: 'Every new person got a clear lane, an escalation path, and a way to grow out of it. That structure, more than hiring speed, is what let the team grow from 5 to 24 without losing reliability.',
    },
    {
      title: 'Shared ownership beats escalation.',
      body: 'A long-running incident-ownership conflict ended with a shared charter across network, network-security, and infra-security teams, instead of another round of escalations.',
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
    'In 2024 I moved into a hands-on tech-lead role to architect the fleet platform, while completing a two-year MBA with Honors (2026).',

  // Employers in the experience section (roles are grouped by `org`)
  orgs: [
    { id: 'meta', name: 'Meta', note: 'formerly Facebook', period: 'Apr 2015 – present', tenure: '11 years', locations: 'Menlo Park, CA · Singapore', logo: 'meta' },
    { id: 'vodafone', name: 'Vodafone Egypt', period: 'Mar 2010 – Apr 2015', tenure: '5 years', locations: 'Cairo, Egypt', logo: 'vodafone' },
  ],

  education: [
    {
      school: 'Boston University, Questrom School of Business',
      degree: 'MBA, With Honors',
      // Text badge in the school's color (not the trademarked logo)
      badge: { text: 'BU', color: '#CC0000' },
      period: 'Jan 2024 – Jan 2026',
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
