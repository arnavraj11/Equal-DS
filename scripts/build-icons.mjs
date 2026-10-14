#!/usr/bin/env node
// Builds the Equal AI icon set from ONE manifest into both platforms:
//   web/src/foundations/icons.ts
//   compose/equal-ds/src/main/java/ai/equal/ds/icons/EqualSymbols.kt
// Flat icons are Material Symbols (Outlined, weight 400; `-fill` = filled) from @material-symbols/svg-400.
// Brand glyphs (WhatsApp) come from simple-icons. Add an icon: add a line to MANIFEST, run `npm run icons`.

import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const symbols = resolve(root, 'node_modules/@material-symbols/svg-400/outlined');

// ds name -> 'symbol_name' | 'symbol_name-fill' | 'brand:<simple-icons export>'
const MANIFEST = {
  // navigation & actions
  'arrow-back': 'arrow_back',
  call: 'call',
  'call-filled': 'call-fill',
  'more-vert': 'more_vert',
  send: 'send-fill',
  check: 'check',
  'done-all': 'done_all',
  close: 'close',
  delete: 'delete',
  star: 'star-fill',
  'star-outline': 'star',
  share: 'share',
  'chevron-right': 'chevron_right',
  'chevron-down': 'keyboard_arrow_down',
  'checkbox-blank': 'check_box_outline_blank',
  'checkbox-checked': 'check_box-fill',
  play: 'play_arrow-fill',
  pause: 'pause-fill',
  chat: 'chat_bubble-fill',
  'chat-outline': 'chat_bubble',
  search: 'search',
  edit: 'edit',
  'edit-profile': 'border_color',
  add: 'add',
  mic: 'mic',
  mute: 'volume_off',
  'person-add': 'person_add',
  calendar: 'calendar_month',
  place: 'location_on',
  'call-received': 'call_received',
  'call-made': 'call_made',
  'call-missed': 'call_missed',
  'phone-incoming': 'phone_callback',
  'phone-missed': 'phone_missed',
  'phone-outgoing': 'phone_forwarded',
  info: 'info',
  settings: 'settings',
  home: 'home',
  work: 'work',
  bolt: 'bolt',
  // You / settings rows (You (Settings) design)
  instructions: 'note_stack',
  'health-check': 'health_metrics',
  'silent-mode': 'notifications_off',
  'voice-language': 'mic',
  'address-pin': 'pin_drop',
  'account-data': 'shield',
  'help-center': 'question_exchange',
  whatsapp: 'brand:siWhatsapp',
  // docs site
  menu: 'menu',
  'arrow-forward': 'arrow_forward',
  'content-copy': 'content_copy',
  'light-mode': 'light_mode',
  'dark-mode': 'dark_mode',
  contrast: 'contrast',
  touch: 'touch_app',
  // system status (Temporarily Unavailable design)
  'notify-me': 'notifications_active',
  // What's New: Language Preference ("Try Voices")
  translate: 'translate_indic',
  'call-sparkle': 'custom:call-sparkle',
  // monetization
  'help-circle': 'help-fill',
  lock: 'lock-fill',
  mail: 'mail-fill',
  'info-fill': 'info-fill',
  // status bar (Material 3 system glyphs)
  signal: 'signal_cellular_4_bar-fill',
  wifi: 'wifi-fill',
  battery: 'battery_full-fill',
  // plan value (Monetization value design)
  timer: 'timer-fill',
  person: 'person-fill',
  'call-log': 'call_log-fill',
  'call-sparkle-fill': 'custom:call-sparkle-fill',
  // Global MYA (assistant sheet)
  'auto-fix': 'wand_stars-fill',
  keyboard: 'keyboard',
  'mic-fill': 'mic-fill',
  navigation: 'navigation-fill',
  'slide-left': 'keyboard_double_arrow_left',
  // Call Handling
  globe: 'public-fill',
  // Monetization experiments
  verified: 'verified-fill',
  refresh: 'refresh',
  'graphic-eq': 'graphic_eq',
  // Missed-call card
  'phone-missed-fill': 'phone_missed-fill',
  'thumb-up': 'thumb_up',
  'thumb-down': 'thumb_down',
  'thumb-up-fill': 'thumb_up-fill',
  'thumb-down-fill': 'thumb_down-fill',
};

const SYMBOL_VB = '0 -960 960 960';

// Glyphs with no Material Symbol: composed from a Symbol plus hand-drawn paths in the same 960 grid.
const callPath = (file = 'call.svg') => [...readFileSync(resolve(symbols, file), 'utf8').matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
const CUSTOM = {
  // "Call me" on the Meet Your Assistant card: handset + outlined 4-point sparkle in the empty top-right.
  'call-sparkle': () => [
    ...callPath(),
    'M690-850Q706-706 850-690Q706-674 690-530Q674-674 530-690Q674-706 690-850ZM690-760Q681-699 620-690Q681-681 690-620Q699-681 760-690Q699-699 690-760Z',
  ],
  // Filled handset + solid sparkle (monetization perk rows).
  'call-sparkle-fill': () => [...callPath('call-fill.svg'), 'M690-850Q706-706 850-690Q706-674 690-530Q674-674 530-690Q674-706 690-850Z'],
};
const entries = Object.entries(MANIFEST).map(([name, src]) => {
  if (src.startsWith('brand:')) {
    const icon = require('simple-icons')[src.slice(6)];
    if (!icon) throw new Error(`simple-icons has no ${src}`);
    return { name, src: `simple-icons/${icon.slug}`, viewBox: '0 0 24 24', paths: [icon.path] };
  }
  if (src.startsWith('custom:')) return { name, src: `custom/${src.slice(7)} (material-symbols call + sparkle)`, viewBox: SYMBOL_VB, paths: CUSTOM[src.slice(7)]() };
  const svg = readFileSync(resolve(symbols, `${src}.svg`), 'utf8');
  const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
  if (!paths.length) throw new Error(`No paths in ${src}.svg`);
  return { name, src: `material-symbols/outlined/${src}`, viewBox: SYMBOL_VB, paths };
});

// ---- web
const ts = `// GENERATED by scripts/build-icons.mjs. Do not edit.
// Material Symbols (Outlined, 400; Apache 2.0) + simple-icons brand glyphs (CC0).

export type IconDef = { viewBox: string; paths: readonly string[] };

export const icons = {
${entries.map((e) => `  ${JSON.stringify(e.name)}: { viewBox: ${JSON.stringify(e.viewBox)}, paths: ${JSON.stringify(e.paths)} },`).join('\n')}
} as const satisfies Record<string, IconDef>;

/** DS icon name -> source glyph, for design / Compose parity. */
export const iconSource = {
${entries.map((e) => `  ${JSON.stringify(e.name)}: ${JSON.stringify(e.src)},`).join('\n')}
} as const;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];
`;
writeFileSync(resolve(root, 'web/src/foundations/icons.ts'), ts);

// ---- Compose
const camel = (s) => s.replace(/-(.)/g, (_, c) => c.toUpperCase());
const kt = `// GENERATED by scripts/build-icons.mjs. Do not edit.
// Material Symbols (Outlined, 400; Apache 2.0) + simple-icons brand glyphs (CC0) — identical paths to web.
@file:Suppress("unused")

package ai.equal.ds.icons

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.addPathNodes
import androidx.compose.ui.unit.dp

/** Every DS icon as an ImageVector (24dp default). Tint with Icon(tint = …) / ColorFilter. */
object EqualSymbols {
${entries
  .map((e) => {
    const [minX, minY, w, h] = e.viewBox.split(' ').map(Number);
    return `    /** ${e.src} */
    val ${camel(e.name)}: ImageVector by lazy { build(${JSON.stringify(e.name)}, ${w}f, ${h}f, ${-minX}f, ${-minY}f, ${e.paths.map((p) => JSON.stringify(p)).join(', ')}) }`;
  })
  .join('\n')}

    private fun build(name: String, vw: Float, vh: Float, tx: Float, ty: Float, vararg paths: String): ImageVector {
        val b = ImageVector.Builder(name = name, defaultWidth = 24.dp, defaultHeight = 24.dp, viewportWidth = vw, viewportHeight = vh)
        b.addGroup(translationX = tx, translationY = ty)
        for (d in paths) b.addPath(pathData = addPathNodes(d), fill = SolidColor(Color.Black))
        b.clearGroup()
        return b.build()
    }
}
`;
writeFileSync(resolve(root, 'compose/equal-ds/src/main/java/ai/equal/ds/icons/EqualSymbols.kt'), kt);
console.log(`  wrote icons.ts + EqualSymbols.kt (${entries.length} icons)`);
