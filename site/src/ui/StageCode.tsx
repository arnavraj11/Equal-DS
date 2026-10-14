import { useState } from 'react';
import composeSnippets from '../registry/compose-snippets.json';
import { CodeTabs } from './kit';
import type { StagePhone } from './TraceStage';

// Where each top-level screen in a state's code lives (anything else is a DS component from '@equal/ds').
const SCREEN_FILE: Record<string, string> = {
  HomeScreen: 'Screens', ChatScreen: 'Screens', YouScreen: 'Screens', ContactInfoScreen: 'Screens', SearchScreen: 'Screens',
  PaywallScreen: 'MonetizationScreens', SubscriptionScreen: 'MonetizationScreens', PaymentResultScreen: 'MonetizationScreens',
  CallHandlingScreen: 'CallHandlingScreens', AlwaysRingScreen: 'CallHandlingScreens', DirectCallsEmptyScreen: 'CallHandlingScreens', KnownCallNotificationScreen: 'CallHandlingScreens',
  AssistantSheet: 'AssistantSheet',
  ChatActionScreen: 'ActionFlows', ChatErrorScreen: 'ActionFlows',
  PersonalDetailsScreen: 'FlowScreens', SilentModeScreen: 'FlowScreens', WhatsAppUpdatesScreen: 'FlowScreens', AddressesScreen: 'FlowScreens', InstructionsFlow: 'FlowScreens', InstructionSetupDemo: 'FlowScreens', SystemStatusFlow: 'FlowScreens',
};

/** Pick a phone state, then read its React and Compose code (Compose comes from compiled Kotlin). */
export function StageCode({ phones, group }: { phones: StagePhone[]; group: string }) {
  const withCode = phones.filter((p) => p.code);
  const [key, setKey] = useState(withCode[0]?.key);
  const phone = withCode.find((p) => p.key === key) ?? withCode[0];
  if (!phone) return null;
  const name = phone.code!.match(/^<([A-Z][A-Za-z]+)/)?.[1] ?? '';
  const file = SCREEN_FILE[name];
  const react = file ? `// web/src/screens/${file}.tsx\nimport { ${name} } from '../screens/${file}';\n\n${phone.code}` : `import { ${name} } from '@equal/ds';\n\n${phone.code}`;
  const compose = (composeSnippets as Record<string, Record<string, string>>)[group]?.[phone.key];
  return (
    <div className="s-stagecode">
      <div className="s-stagecode__states" role="group" aria-label="State">
        {withCode.map((p) => (
          <button key={p.key} type="button" className="s-filter" aria-pressed={p.key === phone.key} onClick={() => setKey(p.key)}>{p.label}</button>
        ))}
      </div>
      <CodeTabs
        key={phone.key}
        tabs={[
          { label: 'React', code: react, lang: 'tsx' },
          ...(compose ? [{ label: 'Compose', code: compose, lang: 'kotlin' as const }] : []),
        ]}
      />
    </div>
  );
}
