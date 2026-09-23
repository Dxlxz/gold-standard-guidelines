// tools/build-llms.js — bina llms.txt + llms-full.txt daripada index.json (konvensyen llmstxt.org)
// Guna: node tools/build-llms.js   [BASE_URL=https://raw.githubusercontent.com/org/repo/main/]
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
function defaultBase() {
  const u = (pkg.repository && pkg.repository.url) || '';
  const m = u.match(/github\.com[/:]([^/]+)\/([^.]+)/);
  return m ? 'https://raw.githubusercontent.com/' + m[1] + '/' + m[2] + '/main/' : '';
}
let BASE = process.env.BASE_URL || defaultBase();
if (BASE && !BASE.endsWith('/')) BASE += '/';
const idx = JSON.parse(fs.readFileSync(path.join(ROOT, 'index.json'), 'utf8'));

const link = (p) => BASE + p;
let llms = '# ' + idx.name + '\n\n';
llms += '> ' + idx.description + '\n';
llms += '> ' + idx.count + ' documents, ' + idx.domains.length + ' domains. Normative language: MUST / MUST NOT / SHOULD / SHOULD NOT.\n';
llms += '> Status: ' + idx.count + ' provisional (draft) standards awaiting review. Generated ' + idx.generated_at.slice(0, 10) + '.\n\n';
llms += 'Start with foundation/ (principles, naming & terminology, authoring, glossary) before applying any standard.\n\n';

for (const d of idx.domains) {
  llms += '## ' + d.title + ' (' + d.count + ')\n';
  for (const doc of idx.docs.filter((x) => x.domain === d.key)) {
    llms += '- [' + doc.title + '](' + link(doc.path) + '): ' + doc.summary + '\n';
  }
  llms += '\n';
}
llms += '## Machine-readable\n';
llms += '- [index.json](' + link('index.json') + '): full catalogue — id, domain, status, tags, applies_to, related, path\n';
llms += '- [front matter schema](' + link('schema/frontmatter.schema.json') + '): metadata contract every document must satisfy\n';
llms += '- [llms-full.txt](' + link('llms-full.txt') + '): complete text of every standard in one file\n';
fs.writeFileSync(path.join(ROOT, 'llms.txt'), llms, 'utf8');

let full = '# ' + idx.name + ' — Complete Corpus (' + idx.count + ' standards)\n\n' + idx.description + '\n\n';
full += 'Normative language: MUST / MUST NOT / SHOULD / SHOULD NOT. All documents are status=draft until reviewed.\n\n## Contents\n\n';
for (const d of idx.domains) {
  full += '### ' + d.title + '\n';
  for (const doc of idx.docs.filter((x) => x.domain === d.key)) {
    full += '- [' + doc.id + '] ' + doc.title + ' — ' + doc.path + '\n';
  }
  full += '\n';
}
let total = 0;
for (const doc of idx.docs) {
  const raw = fs.readFileSync(path.join(ROOT, doc.path), 'utf8').replace(/^---\n[\s\S]*?\n---\n\n/, '');
  full += '\n\n<!-- ===== ' + doc.id + ' | ' + doc.domain + ' | ' + doc.path + ' ===== -->\n\n' + raw;
  total += raw.length;
}
fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), full, 'utf8');

const sz = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
console.log('llms.txt      ', sz(fs.statSync(path.join(ROOT, 'llms.txt')).size), '|', idx.count, 'pautan');
console.log('llms-full.txt ', sz(fs.statSync(path.join(ROOT, 'llms-full.txt')).size), '|', Math.round(total / 1000) + 'k aksara kandungan');
if (BASE) console.log('pautan mutlak: ' + BASE);
else console.log('pautan relatif (set repository.url dalam package.json, atau BASE_URL=…, untuk pautan mutlak)');
