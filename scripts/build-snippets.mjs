#!/usr/bin/env node
// Extracts the Compose code shown on the docs site from real, compiled Kotlin.
//
// Snippets live in compose/equal-ds/src/debug/java/ai/equal/ds/snippets/*.kt (debug source set:
// compiled by `./gradlew :equal-ds:compileDebugKotlin`, never shipped in the release AAR). Each is
//
//   // snippet: <doc id> / <example title>
//   @Composable
//   internal fun SomeName() {
//       ...body shown on the site...
//   }
//
// The body (dedented by 4) is written to site/src/registry/compose-snippets.json as
// { "<doc id>": { "<example title>": "<kotlin>" } }. Keys for screens use "screens / <state key>",
// foundations use "foundations / <section>". Run `npm run snippets`; `--check` lists component
// examples with no Compose snippet.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(root, 'compose/equal-ds/src/debug/java/ai/equal/ds/snippets');
const out = {};
let count = 0;
for (const f of readdirSync(dir).filter((n) => n.endsWith('.kt')).sort()) {
  const lines = readFileSync(resolve(dir, f), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\/\/ snippet: (.+?) \/ (.+?)\s*$/);
    if (!m) continue;
    let j = i + 1;
    while (j < lines.length && !/^(internal |private )?fun \w+\(.*\)\s*\{\s*$/.test(lines[j])) j++;
    if (j >= lines.length) throw new Error(`${f}:${i + 1} snippet "${m[1]} / ${m[2]}" has no function`);
    const body = [];
    let k = j + 1;
    while (k < lines.length && lines[k] !== '}') body.push(lines[k++]);
    if (k >= lines.length) throw new Error(`${f}:${j + 1} function never closes with a column-0 "}"`);
    const text = body.map((l) => (l.startsWith('    ') ? l.slice(4) : l.trimStart() === '' ? '' : l)).join('\n').replace(/^\n+|\n+$/g, '');
    const [doc, title] = [m[1].trim(), m[2].trim()];
    out[doc] ??= {};
    if (out[doc][title]) throw new Error(`Duplicate snippet "${doc} / ${title}" in ${f}`);
    out[doc][title] = text;
    count++;
    i = k;
  }
}
const sorted = Object.fromEntries(Object.keys(out).sort().map((k) => [k, out[k]]));
writeFileSync(resolve(root, 'site/src/registry/compose-snippets.json'), JSON.stringify(sorted, null, 2) + '\n');
console.log(`  wrote compose-snippets.json (${count} snippets)`);

if (process.argv.includes('--check')) {
  const src = readFileSync(resolve(root, 'site/src/registry/components.tsx'), 'utf8');
  const ids = [...src.matchAll(/\n    id: '([a-z0-9-]+)',/g)].map((m) => [m.index, m[1]]);
  const missing = [];
  ids.forEach(([pos, id], n) => {
    const seg = src.slice(pos, n + 1 < ids.length ? ids[n + 1][0] : undefined);
    for (const t of seg.matchAll(/\n        title: (?:'([^']+)'|"([^"]+)")/g)) {
      const title = t[1] ?? t[2];
      if (!sorted[id]?.[title]) missing.push(`${id} / ${title}`);
    }
  });
  console.log(missing.length ? `  missing ${missing.length}:\n    ${missing.join('\n    ')}` : '  every component example has a Compose snippet');
  if (missing.length) process.exitCode = 1;
}
