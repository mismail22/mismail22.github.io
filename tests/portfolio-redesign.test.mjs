import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const words = (html) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter((word) => /[A-Za-z0-9]/.test(word)).length;
const hero = (html) => html.slice(html.indexOf('<main'), html.indexOf('id="systems"'));

test('the first screen says who, the claim, and the credentials', async () => {
  const first = hero(await read('dist/index.html'));
  assert.match(first, /Tech Lead, Infrastructure Platforms/);
  assert.match(first, /I turn manual/);
  assert.match(first, /systems that scale/);
  for (const proof of ['1 tick = 1 day', '1 dot = 1 person', 'measured']) assert.match(first, new RegExp(proof));
});

test('the hero tells the career route on a build-time map', async () => {
  const first = hero(await read('dist/index.html'));
  for (const city of ['Cairo', 'Singapore', 'Menlo Park']) assert.match(first, new RegExp(city));
  const land = first.match(/<path class="land"[^>]* d="([^"]+)"/);
  assert.ok(land, 'dotted land path is rendered in the HTML');
  assert.ok(land[1].split('M').length > 1500, 'the map has enough dots to read as a world map');
  assert.equal((first.match(/class="route route-\d"/g) ?? []).length, 2);
});

test('the night-shift visual identity is in place', async () => {
  const css = await read('src/styles/global.css');
  assert.match(css, /#0a0b0d/i);
  assert.match(css, /Archivo Variable/);
  assert.doesNotMatch(css, /Newsreader|#f2f0e9/i);
});

test('the homepage stays visual: every content section leads with a figure', async () => {
  const html = await read('dist/index.html');
  assert.ok(words(html) <= 700, `homepage has ${words(html)} words; keep it under 700`);
  assert.ok((html.match(/<figure/g) ?? []).length >= 5);
  assert.ok((html.match(/data-viz/g) ?? []).length >= 8);
  for (const id of ['systems', 'teams', 'contact']) assert.match(html, new RegExp(`id="${id}"`));
});

test('LinkedIn and GitHub are icon links with accessible names', async () => {
  const html = await read('dist/index.html');
  const link = html.match(/<a href="https:\/\/www\.linkedin\.com\/in\/mohanad-ismail-egy7"[^>]*>[\s\S]*?<\/a>/);
  assert.ok(link, 'LinkedIn link exists');
  assert.match(link[0], /aria-label="LinkedIn \(opens in a new tab\)"/);
  assert.match(link[0], /<svg/);
  assert.match(html, /aria-label="GitHub \(opens in a new tab\)"/);
});

test('navigation exposes Work, About, and Contact', async () => {
  const html = await read('dist/index.html');
  for (const label of ['Work', 'About', 'Contact']) assert.match(html, new RegExp(`>\\s*${label}\\s*<`));
  assert.doesNotMatch(html, />\s*Evidence\s*</i);
});

test('work and about pages use the same system', async () => {
  const work = await read('dist/work/index.html');
  const about = await read('dist/about/index.html');
  assert.match(work, /Systems, decisions/);
  assert.equal((work.match(/class="study"/g) ?? []).length, 3);
  assert.match(about, /Operator first/);
  assert.match(about, /Capabilities with evidence/);
  assert.match(about, /id="leadership"/);
  assert.doesNotMatch(about, />Expert<|>Proficient<|>Working</i);
});

test('case studies keep provenance, qualifiers, and decisions', async () => {
  const html = await read('dist/work/fleet-governance-platform/index.html');
  assert.match(html, /Sanitized reconstruction/);
  assert.match(html, /Outcomes with provenance/);
  assert.match(html, /Evaluation scope; not a count of assets changed or disposed/);
  assert.match(html, /Decision ledger/);
  assert.match(html, /id="decision-1"/);
});

test('old routes resolve and prototypes are gone', async () => {
  const evidence = await read('dist/evidence/index.html');
  assert.match(evidence, /url=\/work|location.*\/work/i);
  assert.equal(existsSync(new URL('dist/lab', root)), false);
});

test('resume stays conditional and LinkedIn remains available', async () => {
  const site = await read('src/data/site.ts');
  const html = await read('dist/index.html');
  assert.match(html, /linkedin\.com\/in\/mohanad-ismail-egy7/);
  if (/resume:\s*''/.test(site)) assert.doesNotMatch(html, />\s*Résumé\s*</i);
});

test('site remains static, accessible, and reduced-motion aware', async () => {
  const pkg = JSON.parse(await read('package.json'));
  const css = await read('src/styles/global.css');
  const html = await read('dist/index.html');
  assert.equal(pkg.dependencies.react, undefined);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(html, /Skip to content/);
  assert.match(html, /<main id="main"/);
  assert.doesNotMatch(html, /<script[^>]+src=/, 'no external scripts: enhancement is inline and small');
});
