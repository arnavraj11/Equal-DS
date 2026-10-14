# Equal AI design system — Jetpack Compose

Android library module `:equal-ds` (namespace `ai.equal.ds`). It is the Compose half of the Equal AI design system; `SPEC.md` at the repo root is the contract.

- Kotlin 2.0.21 with the `org.jetbrains.kotlin.plugin.compose` plugin
- AGP 8.7.x, compileSdk 35, minSdk 24
- Compose BOM 2024.10.01 (foundation first; Material3 only for `minimumInteractiveComponentSize`)

## Layout

```
compose/
├── settings.gradle.kts            root project "equal-ds-compose", includes :equal-ds
├── build.gradle.kts
├── gradle.properties
└── equal-ds/
    ├── build.gradle.kts
    └── src/main/
        ├── java/ai/equal/ds/
        │   ├── tokens/EqualTokens.kt     GENERATED (npm run tokens). Do not edit.
        │   ├── theme/                    EqualTheme, DM Sans, gradient brush, shadows/press/focus modifiers
        │   ├── icons/EqualSymbols.kt     GENERATED Material Symbols vectors (same paths as web). Do not edit.
        │   ├── icons/EqualLogoVectors.kt GENERATED logo trace (EqualLogoVariant). Do not edit.
        │   ├── icons/EqualIcons.kt       stable icon names → EqualSymbols, EqualMark, EqualWaveform
        │   ├── assets/EqualAsset.kt      EqualAssets enum (placeholder slots) + EqualAssetImage
        │   ├── assets/EqualCategory.kt   EqualCategory enum (real category images)
        │   ├── components/               one file per area
        │   ├── components/Flows.kt       Profile / Addresses / Instructions flow components
        │   ├── components/SystemStatus.kt SystemStatusCard, MeetAssistantCard, SystemNotificationPreview
        │   ├── catalog/Catalog.kt        EqualCatalog, HomeScreenSample, ChatScreenSample, YouScreenSample
        │   ├── catalog/FlowScreens.kt    flow screens + setup chat (port of web FlowScreens.tsx)
        │   ├── catalog/FlowData.kt       sample addresses, instructions, presets (port of flowData.ts)
        │   ├── catalog/MonetizationScreens.kt  paywall, subscription, settings-with-plan, locked chat (port of MonetizationScreens.tsx)
        │   └── catalog/MonetizationData.kt     paywall FAQ, testimonials, subtitle experiment (port of monetizationData.ts)
        └── res/
            ├── drawable/ds_asset_*.xml   checkerboard placeholders (none remaining)
            ├── drawable-xxxhdpi/         ds_category_*.webp (16) + ds_logo_orb_light/dark.webp
            └── values/font_certs.xml     Play Services font-provider certificates
```

## Including the module in an app

The module ships a Gradle 8.10.2 wrapper (`./gradlew`). Open `compose/` in Android Studio, or build from a terminal (JDK 17 and Android SDK 35 required; `local.properties` holds `sdk.dir`):

```bash
./gradlew :equal-ds:assembleRelease :equal-ds:lintDebug
```

Verified 2026-10-01: debug and release AARs build with no compiler warnings and Lint reports no issues (AGP 8.7.3, Kotlin 2.0.21, Compose BOM 2024.10.01).

**Option A: include the module from source (composite path).** In the app's `settings.gradle.kts`:

```kotlin
include(":equal-ds")
project(":equal-ds").projectDir = file("../equal-ds/compose/equal-ds")
```

Then add it to the app's `build.gradle.kts`:

```kotlin
dependencies {
    implementation(project(":equal-ds"))
}
```

Your app also has to apply the Kotlin Compose compiler plugin, `org.jetbrains.kotlin.plugin.compose`.

**Option B: publish an AAR.** Run `./gradlew :equal-ds:assembleRelease` and depend on `equal-ds/build/outputs/aar/equal-ds-release.aar`. You then have to add the Compose dependencies yourself.

### Usage

```kotlin
setContent {
    EqualTheme {                       // follows the system dark mode; pass darkTheme = … to force it
        HomeScreenSample()
    }
}

// inside any component
val c = EqualTheme.colors              // EqualColors (semantic tokens)
val t = EqualTheme.type                // DM Sans type scale
val g = EqualTheme.gradients           // EqualGradientSpec → .toBrush()
Modifier.background(g.fab.toBrush(), CircleShape)
```

Open `catalog/Catalog.kt` in the Android Studio preview to browse every component in light and dark mode.

### Fonts

DM Sans (weights 400, 500, 700 and 400 italic) is a downloadable Google Font served by Play Services. Until it arrives, and on devices without Play Services, text falls back to the system sans-serif.

To bundle the font instead, put the TTFs in `res/font/` and replace `DmSans` in `theme/EqualFonts.kt` with `FontFamily(Font(R.font.dm_sans_regular, FontWeight.W400), …)`.

## Image assets

### Adding an image slot

Every slot is supplied. A new slot can ship a coded grey checkerboard at `equal-ds/src/main/res/drawable/ds_asset_<name_with_underscores>.xml`.

To use the real artwork:

1. **Delete** the placeholder `.xml`, e.g. `ds_asset_illustration_trash.xml`.
2. **Drop in** a `.png` or `.webp` with the **same base name**, e.g. `ds_asset_illustration_trash.webp`. You can put it in `drawable/` or in density buckets (`drawable-xxxhdpi/` …). Use a bitmap, not a vector: `rememberIsPlaceholder` treats any `.xml` as still a placeholder, which is how the gender busts decide to fall back.

You must delete the `.xml`: Android refuses two resources with the same name. No code changes are needed, because `EqualAssets` refers to `R.drawable.ds_asset_*`.

The ActionCard WhatsApp logo is coded: `EqualIcons.WhatsApp` tinted `EqualTheme.colors.brandWhatsapp`.

Supplied in `drawable-xxxhdpi`: `illustration-high-five` (InviteCard), `illustration-trash`, `illustration-silent-mode`, `illustration-whatsapp`, `illustration-addresses-empty`, `illustration-instructions-empty`, `illustration-suggestions`, `avatar-male-bust` / `avatar-female-bust` (GenderSelector, 60 × 56), `whats-new-illustration` (WhatsNewCard, Language Preference robot), `mascot-sleeping` (SystemStatusCard) and `avatar-assistant` (MeetAssistantCard).

### Chat wallpaper (supplied pattern)

`ChatWallpaper` fills with `chat/wallpaper-bg`, then tiles `drawable-nodpi/ds_chat_pattern.webp`.

- The file is an alpha-only mask (black on transparent) at 1080 × 2250 px, which is one 360 × 750dp tile at 3×.
- Every tile is drawn at exactly 360 × 750dp, repeating in both directions and clipped to the bounds.
- It is tinted `chat/wallpaper-pattern` (grey at 8%, the same in light and dark) with `BlendMode.SrcIn`.
- It sits behind the chat screen's message list and the instruction-setup `FullSheet`. It is no longer an asset slot.

`TopBar` draws the full logo as a vector (`EqualLogo`), generated from the official SVG by `scripts/build-logo.mjs`. The robot mascot is supplied (`drawable-xxxhdpi/ds_asset_mascot_robot.webp`); draw it with `EqualMascot(size = 40.dp)`, which keeps the file's transparent padding and scales it so the robot fills the box.

### Profile avatars (real images)

`ProfileAvatar(variant, width)` draws `drawable-xxxhdpi/ds_avatar_male.webp` or `ds_avatar_female.webp` (`ProfileAvatarVariant.Male` / `Female`): a 3D character in a gold scalloped ring.

- `width` is the ring width. The height is `width × 2000/1783` (male) or `width × 2000/1772` (female), because the head rises above the ring on purpose. The image is never cropped.
- Sizes in use: bottom-nav "You" 24 (lifted 3dp, `BottomNavBar(avatar = …)`), `ProfileHeader` 56, `ProfileHero` 70.

### Category avatars (real images)

`EqualCategory` maps 16 categories to `drawable-xxxhdpi/ds_category_<name>.webp`: Career, Delivery, Education, Financial, GateAlert ("Gate alert"), HomeServices, NA ("Unknown"), OrderConfirmation, Others, Others1 ("Others"), OTP, Political, RealEstate, Ride, Services and Travel.

Each image is a full circle with its colour baked in and transparent corners. `CategoryAvatar(category, size, selected = false)` clips it to a circle. It adds no background and no crop; `selected` adds the green check badge.

- `ChatListItem` and `ChatHeader` take `category: EqualCategory? = EqualCategory.NA`, plus `initials` for saved contacts. `ContactInfoHeader` does the same.
- NA is the unknown-caller avatar and replaces the old sparkle.
- Incoming chat bubbles use `incomingCategory = EqualCategory.Others` by default.

To update a category, replace its webp with the same name. Density buckets are optional; the xxxhdpi file is scaled down for lower densities.

### Logo orb (real image)

`EqualLogoOrb(size)` picks `ds_logo_orb_light.webp` (green orb, white dots) or `ds_logo_orb_dark.webp` (lime orb, black dots) from `EqualTheme.colors.isDark`.

- The opaque orb fills the centre 80% of the canvas and the outer 10% on each side is glow. The image is drawn at `size / 0.8` with `requiredSize`, so the orb matches `size` and the glow overflows the layout.
- Don't clip the orb's parent, or the glow is cut off.
- It is used by `AiAvatar` (24/36/48) and the bottom-nav FAB (58).
- The flat six-dot `EqualMark` in the TopBar stays coded.

### Emoji

Action emoji are Unicode text, not images. `SmallActionChip` (16dp), `LargeActionChip` (20dp) and `FeatureBadge` (14dp, default ⭐) take `emoji: String?`.

They render with the platform emoji font. The size is set as `with(LocalDensity.current) { size.toSp() }` (see `EmojiGlyph`), so emoji don't grow with the user's font scale.

Defaults used in samples: Call back 📞, Update address ✏️, Add to calendar 🗓️, Takeover 📞, Ask to reschedule 🗓️.

### Icons

Every flat icon is a generated Material Symbols (Outlined, weight 400) vector in `icons/EqualSymbols.kt`. The paths are identical to web, and the file also carries the WhatsApp brand glyph. It is generated by `scripts/build-icons.mjs`, so don't edit it.

`EqualIcons` re-exports each symbol under a stable name (`EqualIcons.Call`, `EqualIcons.Delete`, `EqualIcons.HelpCenter`, …), so components never reference `EqualSymbols` directly and call sites don't change when icons are regenerated.

- The module does **not** depend on `material-icons-extended`, and no `androidx.compose.material.icons` import remains.
- Outline and fill come from the symbol itself: `Call` is the outline phone, `CallFilled` (Takeover pill) the filled one; the chat tab uses `ChatBubble` (filled) when selected and `ChatBubbleOutline` otherwise.
- The status-bar battery is rotated 90°, and Send is rotated −35° in the composer.

The only other vectors are the traced `EqualMark` / `EqualLogo` (see `EqualLogoVectors.kt`) and the waveform drawing.

### You tab

`components/YouTab.kt` matches `web/src/components/YouTab.tsx`:

- `ProfileHero`: the gold hero with its arcs; the plan card goes in its content slot.
- `PlanCard`: the dark card with a gold pill, underlined "Manage plan" and the coded gold line pattern.
- `AiSummaryCard(status = Empty | Loading | Ready)`: the three summary states, with a pulsing skeleton while loading.
- `InviteCard`: the invite pill card with the high-five art.

`RowGroup` and `SectionHeader` take `inset` (default 20dp, the You-tab inset). See `YouScreenSample` in the catalog.

### Flows (Profile, Addresses, Instructions)

`components/Flows.kt` matches `web/src/components/Flows.tsx`:

- **Shared:** `IllustrationHeader`, `OverflowMenu` (more-vert opening an anchored `ContextMenu` popup), `ChatWallpaper`, and `FullSheet` (72dp from the top, radius 24, orb + title + close header, wallpaper body, footer slot).
- **Profile:** `GenderSelector`.
- **Addresses:** `SavedAddress`, `formatAddress`, `AddressCard` (Edit / Delete address) and `AddressForm`. The form keeps its own draft; Save stays disabled until line 1, city and a 6-digit pincode are filled.
- **Instructions:** `Instruction`, `RecommendedCard`, `SuggestionsComingCard`, `PresetCard`, `WhenDoRow`, `PresetInstructionCard` (Apply, or an Applied pill), `InstructionCard`, and `InstructionPreview` (with an optional ✅ reaction).

`catalog/FlowScreens.kt` ports the screens: `PersonalDetailsScreen`, `SilentModeScreen`, `WhatsAppUpdatesScreen`, `AddressesScreen`, and `InstructionsFlow` with `InstructionSetupSheet`. The setup sheet holds the scripted chat: follow-up questions, bolded answers, Edit / Confirm, and Change something else / That's all. Every state has light and dark previews.

Shared components changed to match web:

- `EqualAppBar`: `align` (Center by default, 56dp), `statusBar`, `elevated`, and a nullable back action.
- `LargeActionChip`: `state` (Unread / Read), with a `text/primary` label.
- `SegmentedChips`: the selected chip uses `chip/selected-bg`.
- `EqualTextField`:
  - No border in light mode.
  - `shape` Rounded or Pill, and `align` Start or Center.
  - Optional `label`; `required` adds `*`.
  - `helper` is an `AnnotatedString`.
  - New `multiline` and `tabular` options.
- `CallSummaryBubble`: new `tag`; the voice player is filled with `voice-player/bg` and has no border.
- `FeedbackCard`: empty stars are the outline star in `text/placeholder`.
- `EqualBottomSheet`: optional `title` row, radius 24 when titled, and a maximum of 92% of the height (content scrolls beyond that).
- `ContextMenu`: new `minWidth`.

### Contact Info

`ContactInfoHeader` matches web `Profile.tsx`:

- A 96dp `ContactAvatar` (category or initials), the name in `headline` and the phone in `bodyLarge` (tabular).
- A full-width row of action tiles, 24dp below, with a gap of 10. Each tile is 72 high with radius 12 on `bg/surface`, with a `stroke/subtle` border in dark. The icon is 24 in `text/action` and the label is `body1`.
- `defaultContactInfoActions(…, muted)` gives Call, Mute/Unmute (silent-mode icon), Save and Share.

`CallHistoryRow(direction, meta, time)`:

- Uses the phone_callback / phone_forwarded / phone_missed symbols at 22dp; only the missed icon is `text/danger`.
- The labels "Incoming Call", "Outgoing Call" and "Missed Call" are `body2` `text/primary`.
- Meta and time are `micro` in `text/secondary`.
- Padding is 14 / 20, with a minimum height of 60.

Put the rows in a `RowGroup` under the CALL HISTORY section header. `ContactInfoScreen` in `catalog/FlowScreens.kt` is the sample screen.

### Large action chips

`LargeActionChip` is 40 high, padding 10 / 12, emoji 18, gap 6. `AiChatPanel` uses 16dp side padding and a single non-wrapping, scrolling row of chips (gap 6), so "💬 Reply on WhatsApp" and "🗓️ Add to Calendar" fit on one line.

## Rules the components follow

- Colours, text styles and gradients come only from `EqualTheme`. Nothing is hard-coded.
- Overline and badge strings are uppercased in code (`text.uppercase()`). Buttons use sentence case.
- Touch targets are at least 48dp.
- Components are stateless and hoist their state (`checked`/`onCheckedChange`, `value`/`onValueChange`).
- Shadows use `Modifier.eqShadow(EqualShadows.x, shape)`. They render on API 28+; on API 24–27 no shadow is drawn.
