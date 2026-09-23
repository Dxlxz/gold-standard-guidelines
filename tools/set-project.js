// tools/set-project.js — tetapkan identiti projek merentas repo (nama, pemilik, tajuk, organisasi)
// Guna:
//   node tools/set-project.js --repo gold-standard --title "Gold Standard" --owner dalej
//   node tools/set-project.js --org "Your Company"        # tukar nama organisasi dalam scaffolding
//   node tools/set-project.js --dry                       # tunjuk apa yang akan berubah sahaja
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');
const arg = (name, def) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
};

const pkgPath = path.join(ROOT, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const old = {
  name: pkg.name,
  title: pkg.displayName || pkg.name,
  url: (pkg.repository && pkg.repository.url) || '',
  org: 'Dxlxz',
};
const oldMatch = old.url.match(/github\.com[/:]([^/]+)\/([^.]+)/);
const oldOwner = oldMatch ? oldMatch[1] : 'OWNER';
const oldRepo = oldMatch ? oldMatch[2] : old.name;

const next = {
  name: arg('repo', old.name),
  title: arg('title', arg('repo') ? arg('repo').split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') : old.title),
  owner: arg('owner', oldOwner),
  org: arg('org', old.org),
};
next.url = 'git+https://github.com/' + next.owner + '/' + next.name + '.git';

const TEXT_FILES = [
  'README.md', 'LICENSE', 'LICENSE-MIT', 'LICENSING.md', 'ATTRIBUTION.md', 'CITATION.cff', 'AGENTS.md',
  'PROVENANCE.md', 'CONTRIBUTING.md', 'GOVERNANCE.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md',
  'CHANGELOG.md', 'package.json', '.github/ISSUE_TEMPLATE/config.yml',
  '.github/ISSUE_TEMPLATE/rule-change.yml', '.github/ISSUE_TEMPLATE/bug.yml',
  '.github/PULL_REQUEST_TEMPLATE.md', 'CODEOWNERS',
];

const pairs = [];
if (oldOwner !== next.owner || oldRepo !== next.name) {
  pairs.push(['github.com/' + oldOwner + '/' + oldRepo, 'github.com/' + next.owner + '/' + next.name]);
  pairs.push([oldOwner + '/' + oldRepo, next.owner + '/' + next.name]);
}
if (old.org !== next.org) pairs.push([old.org, next.org]);

const report = [];
for (const rel of TEXT_FILES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) continue;
  let s = fs.readFileSync(p, 'utf8');
  const before = s;
  for (const [a, b] of pairs) if (a && a !== b) s = s.split(a).join(b);
  if (rel === 'README.md') s = s.replace(/^# .*$/m, '# ' + next.title);
  if (s !== before) {
    const hits = pairs.reduce((n, [a]) => n + (before.split(a).length - 1), 0);
    if (!DRY) fs.writeFileSync(p, s, 'utf8');
    report.push('  ' + rel + '  (' + hits + ' penggantian)');
  }
}

// package.json: identiti
pkg.name = next.name;
pkg.displayName = next.title;
pkg.repository = { type: 'git', url: next.url };
pkg.homepage = 'https://github.com/' + next.owner + '/' + next.name + '#readme';
pkg.bugs = { url: 'https://github.com/' + next.owner + '/' + next.name + '/issues' };
if (next.org !== old.org && pkg.author) pkg.author = pkg.author.replace(old.org, next.org);
if (!DRY) fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
report.push('  package.json  (name=' + next.name + ', displayName=' + next.title + ', owner=' + next.owner + ')');

console.log('=== set-project ===');
console.log('  sebelum : ' + old.name + '  |  "' + old.title + '"  |  ' + oldOwner + '  |  org: ' + old.org);
console.log('  selepas : ' + next.name + '  |  "' + next.title + '"  |  ' + next.owner + '  |  org: ' + next.org);
console.log(report.length ? report.join('\n') : '  (tiada perubahan fail)');

if (!DRY) {
  console.log('\n  bina semula katalog + sahkan…');
  for (const [label, args] of [['build-index', ['tools/build-index.js', '--write-chars']], ['build-llms', ['tools/build-llms.js']], ['validate', ['tools/validate.js']]]) {
    const out = execFileSync('node', args, { cwd: ROOT, encoding: 'utf8' });
    const last = out.trim().split('\n').slice(-2).join(' | ');
    console.log('  ' + label.padEnd(12) + last);
  }
  const idx = JSON.parse(fs.readFileSync(path.join(ROOT, 'index.json'), 'utf8'));
  console.log('  index.json name: "' + idx.name + '"  |  llms.txt H1: ' + fs.readFileSync(path.join(ROOT, 'llms.txt'), 'utf8').split('\n')[0]);
}
