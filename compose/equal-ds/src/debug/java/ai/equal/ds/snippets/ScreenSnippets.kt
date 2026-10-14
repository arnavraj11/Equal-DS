// Compose code shown on the docs site for Screens and the flow pages. Keys: "screens / <state key>"
// and "flow-<flow id> / <state key>" (the keys of the phones on each page). Extracted by
// scripts/build-snippets.mjs; debug source set only.
@file:Suppress("unused")

package ai.equal.ds.snippets

import ai.equal.ds.catalog.AddressesScreen
import ai.equal.ds.catalog.ChatScreenSample
import ai.equal.ds.catalog.ContactInfoScreen
import ai.equal.ds.catalog.HomeScreenSample
import ai.equal.ds.catalog.InstructionSetupDemo
import ai.equal.ds.catalog.InstructionsFlow
import ai.equal.ds.catalog.InstructionsView
import ai.equal.ds.catalog.PersonalDetailsScreen
import ai.equal.ds.catalog.SampleAddresses
import ai.equal.ds.catalog.SetupDemo
import ai.equal.ds.catalog.SilentModeScreen
import ai.equal.ds.catalog.SystemStatusFlowSample
import ai.equal.ds.catalog.SystemStatusStage
import ai.equal.ds.catalog.WhatsAppUpdatesScreen
import ai.equal.ds.catalog.YouScreenSample
import ai.equal.ds.components.AiSummaryStatus
import ai.equal.ds.components.ProfileAvatarVariant
import ai.equal.ds.theme.EqualTheme
import androidx.compose.runtime.Composable

// ---- Screens ---------------------------------------------------------------------------------

// snippet: screens / home
@Composable
internal fun ScreenHomeSnippet() {
    EqualTheme {
        HomeScreenSample()
    }
}

// snippet: screens / live
@Composable
internal fun ScreenChatLiveSnippet() {
    EqualTheme {
        // Compose: ChatScreenSample renders the live-call thread; the after-call variant is a web-only sample
        ChatScreenSample()
    }
}

// snippet: screens / after
@Composable
internal fun ScreenChatAfterSnippet() {
    EqualTheme {
        // Compose: same sample as the live call; compose the after-call thread from ChatHeader + MessageList
        ChatScreenSample()
    }
}

// snippet: screens / you
@Composable
internal fun ScreenYouReadySnippet() {
    EqualTheme {
        YouScreenSample(summary = AiSummaryStatus.Ready)
    }
}

// snippet: screens / you-loading
@Composable
internal fun ScreenYouLoadingSnippet() {
    EqualTheme {
        YouScreenSample(summary = AiSummaryStatus.Loading)
    }
}

// snippet: screens / you-empty
@Composable
internal fun ScreenYouEmptySnippet() {
    EqualTheme {
        YouScreenSample(summary = AiSummaryStatus.Empty, avatar = ProfileAvatarVariant.Female)
    }
}

// snippet: screens / contact
@Composable
internal fun ScreenContactSnippet() {
    EqualTheme {
        ContactInfoScreen(name = "Amit Nanda", phone = "+91 9871746113", onBack = {})
    }
}

// ---- Temporarily unavailable -------------------------------------------------------------------

// snippet: flow-system-status / down
@Composable
internal fun FlowStatusDownSnippet() {
    EqualTheme {
        SystemStatusFlowSample(stage = SystemStatusStage.Unavailable)
    }
}

// snippet: flow-system-status / notified
@Composable
internal fun FlowStatusNotifiedSnippet() {
    EqualTheme {
        SystemStatusFlowSample(stage = SystemStatusStage.Notified)
    }
}

// snippet: flow-system-status / back
@Composable
internal fun FlowStatusBackSnippet() {
    EqualTheme {
        SystemStatusFlowSample(stage = SystemStatusStage.BackOn)
    }
}

// snippet: flow-system-status / live
@Composable
internal fun FlowStatusLiveSnippet() {
    EqualTheme {
        // No stage: tap Notify, and the system recovers after recoverAfterMillis
        SystemStatusFlowSample(recoverAfterMillis = 2500)
    }
}

// ---- Profile -----------------------------------------------------------------------------------

// snippet: flow-profile / personal
@Composable
internal fun FlowProfilePersonalSnippet() {
    EqualTheme {
        PersonalDetailsScreen(onBack = {}, onChange = { name, gender -> })
    }
}

// snippet: flow-profile / silent
@Composable
internal fun FlowProfileSilentSnippet() {
    EqualTheme {
        SilentModeScreen(onBack = {})
    }
}

// snippet: flow-profile / wa
@Composable
internal fun FlowProfileWhatsAppSnippet() {
    EqualTheme {
        WhatsAppUpdatesScreen(onBack = {})
    }
}

// snippet: flow-profile / wa-sheet
@Composable
internal fun FlowProfileWhatsAppSheetSnippet() {
    EqualTheme {
        WhatsAppUpdatesScreen(onBack = {}, showSheet = true)
    }
}

// ---- Addresses ---------------------------------------------------------------------------------

// snippet: flow-addresses / empty
@Composable
internal fun FlowAddressesEmptySnippet() {
    EqualTheme {
        AddressesScreen(onBack = {}, initial = emptyList())
    }
}

// snippet: flow-addresses / list
@Composable
internal fun FlowAddressesListSnippet() {
    EqualTheme {
        AddressesScreen(onBack = {}, initial = SampleAddresses)
    }
}

// snippet: flow-addresses / edit
@Composable
internal fun FlowAddressesEditSnippet() {
    EqualTheme {
        AddressesScreen(onBack = {}, openEdit = SampleAddresses[3].id)
    }
}

// snippet: flow-addresses / delete
@Composable
internal fun FlowAddressesDeleteSnippet() {
    EqualTheme {
        AddressesScreen(onBack = {}, confirmDelete = SampleAddresses[0].id)
    }
}

// ---- Instructions ------------------------------------------------------------------------------

// snippet: flow-instructions / hub
@Composable
internal fun FlowInstructionsHubSnippet() {
    EqualTheme {
        InstructionsFlow(onBack = {}, initialActive = emptyList())
    }
}

// snippet: flow-instructions / preset
@Composable
internal fun FlowInstructionsPresetSnippet() {
    EqualTheme {
        InstructionsFlow(initialActive = emptyList(), initialView = InstructionsView.PresetDetail("screen"))
    }
}

// snippet: flow-instructions / setup
@Composable
internal fun FlowInstructionsSetupSnippet() {
    EqualTheme {
        InstructionSetupDemo(which = SetupDemo.Decline)
    }
}

// snippet: flow-instructions / setup-input
@Composable
internal fun FlowInstructionsSetupInputSnippet() {
    EqualTheme {
        InstructionSetupDemo(which = SetupDemo.Delivery)
    }
}

// snippet: flow-instructions / active
@Composable
internal fun FlowInstructionsActiveSnippet() {
    EqualTheme {
        InstructionsFlow(initialView = InstructionsView.Active)
    }
}

// snippet: flow-instructions / active-empty
@Composable
internal fun FlowInstructionsActiveEmptySnippet() {
    EqualTheme {
        InstructionsFlow(initialActive = emptyList(), initialView = InstructionsView.Active)
    }
}

// snippet: flow-instructions / no-recs
@Composable
internal fun FlowInstructionsNoRecsSnippet() {
    EqualTheme {
        InstructionsFlow(noRecommendations = true)
    }
}

// ---- Contact info ------------------------------------------------------------------------------

// snippet: flow-contact-info / contact
@Composable
internal fun FlowContactInfoSnippet() {
    EqualTheme {
        ContactInfoScreen(name = "Amit Nanda", phone = "+91 9871746113", onBack = {})
    }
}
