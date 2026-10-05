// Project filter categories. Add a key here before using it in projects.json.
export const categories = {
  platforms: 'Platforms',
  automation: 'Automation',
  'ai-ml': 'AI / ML',
  leadership: 'Leadership',
  tools: 'Tools',
} as const;

export type Category = keyof typeof categories;
