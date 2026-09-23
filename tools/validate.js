// tools/validate.js — gerbang kualiti repo: metadata, penamaan, pautan, kesegaran indeks
// Guna: node tools/validate.js
const fs = require('fs');
const path = require('path');
const { parse, REQUIRED, STATUSES, DOMAIN_ORDER, DOMAIN_TITLES } = require('./lib/fm');

const ROOT = path.resolve(__dirname, '..');
const errors = [], warns = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/^\.|node_modules/.test(e.name)) walk(p, out); }
    else if (/\.md$/.test(e.name)) out.push(p);
  }
  return out;
}

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const docs = [];
const all = walk(ROOT);
const docFiles = all.filter((p) => /standards[\\/]|foundation[\\/]/.test(p));

for (const p of docFiles) {
  const r = rel(p);
  const raw = fs.readFileSync(p, 'utf8');
  const { data, body, hasFm } = parse(raw);
  if (!hasFm) { errors.push(r + ': tiada front matter'); continue; }
  for (const k of REQUIRED) if (!data[k]) errors.push(r + ': medan wajib hilang → ' + k);
  // pengawal privasi: repo awam tidak boleh membawa provenance peribadi
  for (const k of ['source', 'conversation_id']) {
    if (data[k]) errors.push(r + ': medan peribadi dilarang dalam repo awam → ' + k);
  }
  const today = new Date().toISOString().slice(0, 10);
  if (data.review_by && data.review_by < today && data.status !== 'deprecated' && data.status !== 'draft') {
    warns.push(r + ': review_by telah luput (' + data.review_by + ') — jadualkan semakan semula');
  }
  if (data.status && !STATUSES.includes(data.status)) errors.push(r + ': status tidak sah "' + data.status + '"');
  if (data.version && !/^\d+\.\d+\.\d+$/.test(data.version)) errors.push(r + ': versi bukan semver "' + data.version + '"');
  for (const k of ['created', 'updated', 'review_by']) {
    if (data[k] && !/^\d{4}-\d{2}-\d{2}$/.test(data[k])) errors.push(r + ': ' + k + ' bukan ISO date');
  }
  if (data.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.id)) errors.push(r + ': id bukan kebab-case "' + data.id + '"');
  if (!Array.isArray(data.tags) || !data.tags.length) errors.push(r + ': tags kosong');
  if (!Array.isArray(data.applies_to) || !data.applies_to.length) errors.push(r + ': applies_to kosong');
  const parts = r.split('/');
  const dirDomain = parts[0] === 'standards' ? parts[1] : 'foundation';
  if (data.domain && data.domain !== dirDomain) errors.push(r + ': domain ≠ folder (' + data.domain + ' vs ' + dirDomain + ')');
  const file = path.basename(p);
  if (!/^\d{2}-[a-z0-9-]+\.md$/.test(file)) errors.push(r + ': nama fail mesti NN-kebab-case.md');
  const bodyLen = (body || '').trim().length;
  if (bodyLen < 3000) errors.push(r + ': kandungan terlalu pendek (' + bodyLen + ' aksara, min 3000)');
  docs.push({ r, data, bodyLen, file, dirDomain });
}

// id unik + related resolve + pendua tajuk
const ids = new Map(), titles = new Map();
for (const d of docs) {
  if (ids.has(d.data.id)) errors.push('id berulang: ' + d.data.id + ' (' + ids.get(d.data.id) + ' & ' + d.r + ')');
  else ids.set(d.data.id, d.r);
  const t = (d.data.title || '').toLowerCase();
  if (titles.has(t)) warns.push('tajuk serupa: "' + d.data.title + '" (' + titles.get(t) + ' & ' + d.r + ')');
  else titles.set(t, d.r);
  for (const rel2 of (d.data.related || [])) {
    if (!ids.has(rel2) && !docs.some((x) => x.data.id === rel2)) warns.push(d.r + ': related "' + rel2 + '" tidak wujud');
  }
}
for (const d of docs) for (const rel2 of (d.data.related || [])) if (!docs.some((x) => x.data.id === rel2)) errors.push(d.r + ': related tidak wujud → ' + rel2);

// nombor unik dalam domain
const numSeen = {};
for (const d of docs) {
  const key = d.dirDomain + '/' + d.file.slice(0, 2);
  if (numSeen[key]) warns.push('nombor berulang dalam domain: ' + key);
  numSeen[key] = 1;
}

// kesegaran index.json + llms.txt
const idxPath = path.join(ROOT, 'index.json');
if (!fs.existsSync(idxPath)) errors.push('index.json tiada — jalankan: node tools/build-index.js');
else {
  const idx = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
  if (idx.count !== docs.length) errors.push('index.json basi: ' + idx.count + ' dokumen vs ' + docs.length + ' sebenar — jalankan build-index');
  const idxPaths = new Set(idx.docs.map((d) => d.path));
  for (const d of docs) if (!idxPaths.has(d.r)) warns.push('index.json tiada entri untuk ' + d.r);
  for (const dm of idx.docs) if (dm.chars !== docs.find((x) => x.r === dm.path)?.bodyLen) warns.push('index.json chars tidak sepadan: ' + dm.path);
}
const llmsPath = path.join(ROOT, 'llms.txt');
if (!fs.existsSync(llmsPath)) errors.push('llms.txt tiada — jalankan: node tools/build-llms.js');
else {
  const t = fs.readFileSync(llmsPath, 'utf8');
  const missing = docs.filter((d) => !t.includes(d.r));
  if (missing.length) warns.push('llms.txt tiada ' + missing.length + ' dokumen (jalankan build-llms)');
}

// ringkasan
console.log('=== validate: ' + docs.length + ' dokumen ===');
for (const dom of DOMAIN_ORDER) {
  const n = docs.filter((d) => d.dirDomain === dom).length;
  if (n) console.log('  ' + dom.padEnd(12) + String(n).padStart(3) + '  ' + DOMAIN_TITLES[dom]);
}
console.log('  status: ' + JSON.stringify(docs.reduce((a, d) => (a[d.data.status] = (a[d.data.status] || 0) + 1, a), {})));
if (warns.length) { console.log('\nAMARAN (' + warns.length + '):'); for (const w of warns.slice(0, 20)) console.log('  ~ ' + w); if (warns.length > 20) console.log('  … +' + (warns.length - 20)); }
if (errors.length) { console.log('\nRALAT (' + errors.length + '):'); for (const e of errors.slice(0, 30)) console.log('  ! ' + e); if (errors.length > 30) console.log('  … +' + (errors.length - 30)); process.exit(1); }
console.log('\n✓ lulus: metadata, penamaan, pautan, indeks, llms.txt');
