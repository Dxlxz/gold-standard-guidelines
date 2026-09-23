// tools/build-index.js — bina index.json daripada front matter (katalog mesra-mesin)
// Guna: node tools/build-index.js
const fs = require('fs');
const path = require('path');
const { parse, REQUIRED, DOMAIN_ORDER, DOMAIN_TITLES } = require('./lib/fm');

const ROOT = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const PROJECT_NAME = pkg.displayName || pkg.name;
const WRITE_CHARS = process.argv.includes('--write-chars');   // betulkan medan chars yang tidak tepat dalam front matter
const SKIP = new Set(['README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'GOVERNANCE.md', 'LICENSE', 'AGENTS.md']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/^\.|node_modules/.test(e.name)) walk(p, out); }
    else if (/\.md$/.test(e.name) && !SKIP.has(e.name)) out.push(p);
  }
  return out;
}

function summarize(body) {
  const lines = body.split(/\r?\n/);
  const idx = lines.findIndex((l) => /^#{1,3}\s*(?:\d+[.)]\s*)?Purpose\b/i.test(l));
  const pool = idx >= 0 ? lines.slice(idx + 1) : lines;
  const buf = [];
  for (const l of pool) {
    if (/^#{1,6}\s/.test(l)) { if (buf.length) break; else continue; }
    if (!l.trim()) { if (buf.length) break; else continue; }
    if (/^\s*([-*|>]|\d+[.)])\s/.test(l)) { if (buf.length) break; else continue; }
    buf.push(l.trim());
    if (buf.join(' ').length > 240) break;
  }
  let s = buf.join(' ').replace(/\s+/g, ' ').replace(/[*_`]/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim();
  if (!s) s = '(tiada ringkasan)';
  return s.length > 240 ? s.slice(0, 237).trim() + '…' : s;
}

const files = walk(ROOT).filter((p) => /(^|[\\/])standards[\\/]|(^|[\\/])foundation[\\/]/.test(p));
const docs = [];
const problems = [];

for (const p of files) {
  const rel = path.relative(ROOT, p).split(path.sep).join('/');
  const raw = fs.readFileSync(p, 'utf8');
  const { data, body, hasFm } = parse(raw);
  if (!hasFm) { problems.push(rel + ': tiada front matter'); continue; }
  for (const k of REQUIRED) if (data[k] === undefined || data[k] === null || data[k] === '') problems.push(rel + ': medan kurang → ' + k);
  const dirDomain = rel.split('/')[0] === 'standards' ? rel.split('/')[1] : 'foundation';
  if (data.domain && data.domain !== dirDomain) problems.push(rel + ': domain "' + data.domain + '" ≠ folder "' + dirDomain + '"');
  const measured = (body || '').trim().length;
  if (WRITE_CHARS && data.chars !== measured) {
    const fixed = raw.replace(/^chars:\s*\d+\s*$/m, 'chars: ' + measured);
    if (fixed !== raw) { fs.writeFileSync(p, fixed, 'utf8'); console.log('  chars dikemas kini: ' + rel + ' → ' + measured); }
  }
  docs.push({
    id: data.id, title: data.title, domain: dirDomain, status: data.status || 'draft', version: data.version || '0',
    owner: data.owner || null, tags: data.tags || [], applies_to: data.applies_to || [], related: data.related || [],
    path: rel, chars: measured, created: data.created || null, updated: data.updated || null,
    review_by: data.review_by || null, legacy_number: data.legacy_number || null,
    summary: summarize(body || ''),
  });
}

const order = new Map(DOMAIN_ORDER.map((d, i) => [d, i]));
docs.sort((a, b) => (order.get(a.domain) - order.get(b.domain)) || a.path.localeCompare(b.path));

const byDomain = {};
for (const d of docs) byDomain[d.domain] = (byDomain[d.domain] || 0) + 1;

const index = {
  name: PROJECT_NAME,
  description: pkg.description || 'Canonical engineering, design, data, AI and operational standards.',
  generated_at: new Date().toISOString(),
  count: docs.length,
  domains: DOMAIN_ORDER.filter((d) => byDomain[d]).map((d) => ({ key: d, title: DOMAIN_TITLES[d], count: byDomain[d] })),
  docs,
};

fs.writeFileSync(path.join(ROOT, 'index.json'), JSON.stringify(index, null, 1), 'utf8');
console.log('index.json ditulis:', docs.length, 'dokumen');
for (const d of index.domains) console.log('  ' + d.key.padEnd(12) + d.count + '  ' + d.title);
if (problems.length) {
  console.log('\nMASALAH (' + problems.length + '):');
  for (const p of problems.slice(0, 30)) console.log('  ! ' + p);
  if (problems.length > 30) console.log('  … dan ' + (problems.length - 30) + ' lagi');
  process.exit(1);
}
console.log('\nsemua dokumen lengkap metadata ✓');
