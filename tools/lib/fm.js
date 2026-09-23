// tools/lib/fm.js — parser/penulis front matter (subset YAML yang kita guna)
const REQUIRED = ['id', 'title', 'domain', 'status', 'version', 'owner', 'tags', 'applies_to', 'created', 'updated'];
const STATUSES = ['draft', 'review', 'active', 'deprecated'];
const DOMAIN_ORDER = ['foundation', 'design', 'engineering', 'data', 'ai', 'security', 'operations', 'process'];
const DOMAIN_TITLES = {
  foundation: 'Foundation',
  design: 'Design & UX',
  engineering: 'Engineering',
  data: 'Data & Geospatial',
  ai: 'AI & LLM',
  security: 'Security, Privacy & Compliance',
  operations: 'Operations & Delivery',
  process: 'Process & Team',
};

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw, hasFm: false };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    const k = kv[1];
    let v = kv[2].trim();
    if (v === '' || v === 'null' || v === '~') { data[k] = null; continue; }
    if (v.startsWith('[')) {
      data[k] = v.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
    } else if (v.startsWith('"') && v.endsWith('"')) {
      data[k] = v.slice(1, -1).replace(/\\"/g, '"');
    } else if (/^-?\d+$/.test(v)) {
      data[k] = parseInt(v, 10);
    } else {
      data[k] = v;
    }
  }
  return { data, body: raw.slice(m[0].length), hasFm: true };
}

function q(s) {
  return '"' + String(s == null ? '' : s).replace(/"/g, "'").replace(/\r?\n/g, ' ') + '"';
}

function serialize(data, body) {
  const order = ['id', 'title', 'domain', 'status', 'version', 'owner', 'tags', 'applies_to', 'related',
    'legacy_number', 'legacy_file', 'source', 'conversation_id', 'created', 'updated', 'review_by', 'chars'];
  const lines = ['---'];
  for (const k of order) {
    if (data[k] === undefined || data[k] === null) continue;
    const v = data[k];
    if (Array.isArray(v)) lines.push(k + ': [' + v.map((x) => q(x)).join(', ') + ']');
    else if (typeof v === 'number') lines.push(k + ': ' + v);
    else lines.push(k + ': ' + (k === 'chars' ? v : q(v)));
  }
  for (const k of Object.keys(data)) if (!order.includes(k) && data[k] != null) {
    const v = data[k];
    lines.push(k + ': ' + (Array.isArray(v) ? '[' + v.map((x) => q(x)).join(', ') + ']' : q(v)));
  }
  lines.push('---');
  return lines.join('\n') + '\n\n' + body.replace(/^\s+/, '');
}

function slug(s, max = 58) {
  return String(s).toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ').trim().replace(/\s+/g, '-').replace(/-+/g, '-')
    .slice(0, max).replace(/-$/, '');
}

module.exports = { parse, serialize, slug, REQUIRED, STATUSES, DOMAIN_ORDER, DOMAIN_TITLES, q };
