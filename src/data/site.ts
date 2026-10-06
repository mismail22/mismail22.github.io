// Single place for personal details. Edit this file to update the hero,
// contact links and SEO metadata. Longer lists live in the JSON files next to
// this one, and case studies live in src/content/work/.

export const site = {
  name: 'Mohanad Ismail',
  handle: 'mohanad',
  role: 'Tech Lead · Infrastructure Platforms & Automation · Meta',
  identity: 'Tech Lead, Infrastructure Platforms / Meta / 16 years',
  title: 'Mohanad Ismail · Infrastructure Platforms & Automation',
  description:
    'Mohanad Ismail turns manual infrastructure operations into systems that scale: 16 years from a national mobile network in Cairo to network and fleet automation at Meta.',
  // One line per row of the hero headline.
  headline: ['I turn manual', 'operations into', 'systems that scale.'],
  location: 'Menlo Park, CA',
  status: 'Open to Staff+ and engineering leadership roles in infrastructure',

  // The career route drawn on the hero map. `label` places the map caption.
  journey: [
    {
      key: 'cairo',
      city: 'Cairo',
      years: '2010–2015',
      org: 'Vodafone',
      what: 'Ran a national mobile packet core and automated its operations',
      lat: 30.04,
      lng: 31.24,
      label: 'left',
    },
    {
      key: 'singapore',
      city: 'Singapore',
      years: '2015–2018',
      org: 'Facebook',
      what: 'Integrated 10+ telecom carriers for apps used by billions',
      lat: 1.35,
      lng: 103.82,
      label: 'below-left',
    },
    {
      key: 'menlo',
      city: 'Menlo Park',
      years: '2018–now',
      org: 'Meta',
      what: 'Automated network operations, led a 24-person lab team, built a fleet system of record',
      lat: 37.45,
      lng: -122.18,
      label: 'below',
    },
  ],

  careerEras: [
    { years: '2010–2015', place: 'Cairo', title: 'Operate the network', body: 'National mobile packet core, routing, and the physical consequences of infrastructure failure.' },
    { years: '2015–2022', place: 'Singapore → Menlo Park', title: 'Automate the operation', body: 'Carrier integrations, network workflows, incident response, ML intake, and hardware lifecycle automation.' },
    { years: '2022–2024', place: 'Menlo Park', title: 'Design the operating model', body: 'Reliability, ownership, escalation, and a blended organization scaled from 5 to 24.' },
    { years: '2024–now', place: 'Menlo Park', title: 'Build the control plane', body: 'Live fleet governance, guarded bulk actions, auditability, and AI-assisted engineering.' },
  ],

  // Optional public email. Leave empty to keep it off the site.
  email: '' as string,
  // Path inside /public (e.g. 'resume.pdf'). Leave empty to hide the Resume buttons.
  resume: '' as string,
  repo: 'https://github.com/mismail22/mismail22.github.io',

  socials: [
    { label: 'LinkedIn', handle: 'mohanad-ismail-egy7', href: 'https://www.linkedin.com/in/mohanad-ismail-egy7', icon: 'linkedin' },
    { label: 'GitHub', handle: 'mismail22', href: 'https://github.com/mismail22', icon: 'github' },
    // { label: 'X', handle: 'yourhandle', href: 'https://x.com/yourhandle', icon: 'x' },
  ],

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
