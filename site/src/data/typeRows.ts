import type { TypeName } from '@equal/ds';

export type TypeRow = { token: TypeName; tier: string; sample: string; lives: string };

export const typeRows: TypeRow[] = [
  { token: 'headline', tier: 'Display', sample: 'Keshav', lives: 'Profile name, contact name on Contact info, Settings title, onboarding headlines' },
  { token: 'title', tier: 'Display', sample: 'Turn off Call Learning?', lives: "Dialog titles, plan card product name, What's New headings" },
  { token: 'subheading', tier: 'Text', sample: 'Assistant Health Check', lives: 'App bar titles, settings rows, chat list names, card titles, sheet titles' },
  { token: 'bodyLarge', tier: 'Text', sample: "Your family calls you a lot. They always say it's urgent.", lives: 'AI Summary body, search input, address field values' },
  { token: 'body2', tier: 'Text', sample: 'WhatsApp · Amit Nanda', lives: 'Equal AI sender line, attribution, instruction condition & action' },
  { token: 'body1', tier: 'Text', sample: 'Vijay from NoBroker called with an offer on a 2BHK flat in Sector 12.', lives: 'Call summaries, assistant messages, previews, dialog body, phone numbers' },
  { token: 'body1Italic', tier: 'Text', sample: 'Delivery agent calls for directions, assistant guides them to Gate 2', lives: 'Consent carousel example lines (illustrative, not fact)' },
  { token: 'button', tier: 'Action', sample: 'Add new instruction', lives: 'Filled buttons, in-card text actions, action chips, sheet chips' },
  { token: 'buttonSmall', tier: 'Action', sample: 'Manage plan', lives: 'Dense containers: Manage plan, Clear all, overflow items, chat-list chips' },
  { token: 'caption', tier: 'Support', sample: 'Allow AI to learn from calls', lives: 'Row descriptions, nav labels, pills, helper text (single line: Medium)' },
  { token: 'captionWrap', tier: 'Support', sample: 'When this is on, assistant pays attention to how your calls go so it can handle them more like you would.', lives: 'Caption the moment it wraps: Regular, 18 line height' },
  { token: 'micro', tier: 'Support', sample: '03:21 · 00:00 / 02:37 · Today • 30 Sec.', lives: 'Timestamps, dates, thread events, call history (tabular)' },
  { token: 'overline', tier: 'Utility', sample: 'Settings & support', lives: 'Section headers, form field labels (uppercase, +0.08em)' },
  { token: 'badge', tier: 'Utility', sample: 'Unlimited', lives: 'NEW / UNLIMITED markers (uppercase, +0.06em)' },
  { token: 'badgeCount', tier: 'Utility', sample: '12', lives: 'Unread count on the Chats tab (tabular, −0.026em)' },
];
