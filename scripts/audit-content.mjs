// Pre-publish content audit for the built site (run after `npm run build`).
// Fails if dist/ contains internal names, personal contact details, or
// unresolved [CONFIRM] markers. `--numbers` also lists every numeric claim
// so they can be checked against the source of truth before shipping.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

// Case-sensitive, whole-word where needed to avoid false positives ("priority").
const BANNED = [
  [/\[CONFIRM/g, 'unresolved [CONFIRM] marker'],
  [/\bRIO\b/g, 'internal tool name'],
  [/Dataswarm|Daiquiri|JustKnob|Metamate|Netgram|XCelerate/gi, 'internal tool name'],
  [/\bHive\b/g, 'internal tool name'],
  [/\bPACT\b|\bPSAT\b|\bENSO\b|\bFBID\b/g, 'internal acronym'],
  [/\bSEV\s?S?\d{4,}/g, 'incident ID'],
  [/mohanad\.amr|492-9777|mismail@meta/g, 'personal contact detail'],
  [/mailto:/g, 'public email link'],
  [/Network Engineer, Automation|Environments Lead|Network Operations Engineer|Senior Network Engineer/g, 'internal job title (use resume titles)'],
  [/\$\s?\d[\d,.]*\s?(?:M|B|K|million|billion)\b\+?/g, 'exact dollar figure (use magnitudes on the public site)'],
  [/\b(?:Kubernetes|Docker|Terraform|Ansible|InfiniBand|RoCE\w*)\b/g, 'unsupported skill claim (keep off the site, or move to the AI/HPC journey line)'],
];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(html|xml|txt)$/.test(name)) files.push(path);
  }
})(DIST);

const text = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');

// The one defensible AI/HPC mention (journey) is allowed; anything else is flagged.
const ALLOWED = [/source-of-truth data for AI\/HPC fabric devices \(InfiniBand, RoCEv2\)/g];

let problems = 0;
for (const file of files) {
  const html = ALLOWED.reduce((h, re) => h.replace(re, '[allowed]'), readFileSync(file, 'utf8'));
  for (const [pattern, why] of BANNED) {
    for (const match of html.matchAll(pattern)) {
      const at = Math.max(0, match.index - 50);
      console.log(`✗ ${file.replace(DIST, '')}: ${why}: …${text(html.slice(at, match.index + 70)).replace(/\s+/g, ' ').trim()}…`);
      problems++;
    }
  }
}

if (process.argv.includes('--numbers')) {
  const claims = new Map();
  for (const file of files.filter((f) => f.endsWith('.html'))) {
    for (const m of text(readFileSync(file, 'utf8')).matchAll(/[~$<]?\d[\d,.]*\s?(?:%|[MBK]\+?|\+|×|x|Tbps|T|h|hrs?|hours|days|d|yrs?|wk)?/g)) {
      const key = m[0].trim();
      if (/^\d{4}$/.test(key) || key.length < 2) continue; // skip years and single digits
      claims.set(key, (claims.get(key) ?? 0) + 1);
    }
  }
  console.log(`\nNumeric claims (${claims.size} distinct):`);
  console.log([...claims.keys()].sort().join('  '));
}

console.log(problems ? `\n${problems} problem(s) found. Fix before publishing.` : `\nContent audit passed (${files.length} files).`);
process.exit(problems ? 1 : 0);
