// Compose code shown on the docs site for the chat action flows: the chat-actions and missed-call
// component pages ("<doc id> / <example title>") and the flow pages ("flow-call-back",
// "flow-mute", "flow-reply-whatsapp", "flow-save-contact", "flow-error-states" / <state key>).
// Extracted by scripts/build-snippets.mjs; debug source set only.
@file:Suppress("unused")

package ai.equal.ds.snippets

import ai.equal.ds.assets.EqualCategory
import ai.equal.ds.catalog.ChatAction
import ai.equal.ds.catalog.ChatActionScreen
import ai.equal.ds.catalog.ChatErrorScreen
import ai.equal.ds.catalog.ErrorState
import ai.equal.ds.catalog.MissedCase
import ai.equal.ds.components.AiTurn
import ai.equal.ds.components.CallFeedback
import ai.equal.ds.components.EditBubble
import ai.equal.ds.components.EditDimColor
import ai.equal.ds.components.HoldToSpeakBar
import ai.equal.ds.components.MissedCallCard
import ai.equal.ds.components.NewContactForm
import ai.equal.ds.components.NewContactValue
import ai.equal.ds.components.NewContactVariant
import ai.equal.ds.components.OfflineScreen
import ai.equal.ds.components.OfflineSheet
import ai.equal.ds.components.ReplyAction
import ai.equal.ds.theme.EqualTheme
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle

// ---- Component: chat-actions -----------------------------------------------------------------

// snippet: chat-actions / Assistant turn
@Composable
internal fun ChatActionsAiTurnSnippet() {
    EqualTheme {
        AiTurn(
            text = "Are you sure? You’ll not get any call from them even if it’s important",
            actions = listOf(ReplyAction(label = "Mute", emoji = "🔕", onClick = { /* mute */ })),
        )
    }
}

// snippet: chat-actions / Hold to speak
@Composable
internal fun ChatActionsHoldToSpeakSnippet() {
    EqualTheme {
        HoldToSpeakBar(onHold = { /* record */ }, onKeyboard = { /* show keyboard */ })
    }
}

// snippet: chat-actions / Edit bubble
@Composable
internal fun ChatActionsEditBubbleSnippet() {
    EqualTheme {
        var draft by remember { mutableStateOf("Hi Amit! Count me in for Sunday 8 PM. See you there 👍") }
        // Over the chat dimmed with EditDimColor; lift above the keyboard with imePadding()
        Box(Modifier.background(EditDimColor)) {
            EditBubble(value = draft, onValueChange = { draft = it }, onDone = { /* save */ }, autoFocus = true)
        }
    }
}

// snippet: chat-actions / New contact: iOS parity
@Composable
internal fun ChatActionsContactGroupedSnippet() {
    EqualTheme {
        NewContactForm(
            value = NewContactValue(first = "Rahul (Electrician)", phone = "+91 98717 46113"),
            variant = NewContactVariant.Grouped,
            onClose = { /* close */ },
            onSave = { /* save */ },
        )
    }
}

// snippet: chat-actions / New contact: WhatsApp parity
@Composable
internal fun ChatActionsContactOutlinedSnippet() {
    EqualTheme {
        var sync by remember { mutableStateOf(true) }
        NewContactForm(
            value = NewContactValue(first = "Rahul (Electrician)", phone = "+91 98717 46113", sync = sync),
            variant = NewContactVariant.Outlined,
            onSave = { /* save */ },
            onSync = { sync = it },
        )
    }
}

// snippet: chat-actions / Offline
@Composable
internal fun ChatActionsOfflineSnippet() {
    EqualTheme {
        OfflineSheet(onRefresh = { /* refresh */ })   // over a chat
        OfflineScreen(onRetry = { /* retry */ })      // nothing to show yet
    }
}

// ---- Component: missed-call ------------------------------------------------------------------

// snippet: missed-call / With a reason
@Composable
internal fun MissedCallReasonSnippet() {
    EqualTheme {
        var feedback by remember { mutableStateOf<CallFeedback?>(null) }
        MissedCallCard(
            caller = "Kuldeep Solanki",
            category = EqualCategory.RealEstate,
            reason = buildAnnotatedString {
                append("Promote ")
                withStyle(SpanStyle(fontWeight = FontWeight.Bold)) { append("L&T Realty residential") }
                append(" projects.")
            },
            time = "03:21",
            onCallBack = { /* call back */ },
            feedback = feedback,
            onFeedback = { feedback = it },
        )
    }
}

// snippet: missed-call / Caller unknown
@Composable
internal fun MissedCallUnknownSnippet() {
    EqualTheme {
        MissedCallCard(time = "3:31 PM", onCallBack = { /* call back */ })
    }
}

// snippet: missed-call / Name only
@Composable
internal fun MissedCallNameSnippet() {
    EqualTheme {
        MissedCallCard(caller = "Valluri", time = "3:31 PM", onCallBack = { /* call back */ })
    }
}

// ---- Flow: call-back -----------------------------------------------------------------------------

// snippet: flow-call-back / live
@Composable
internal fun FlowCallBackLiveSnippet() {
    EqualTheme {
        // Runs live from the chat: tap the chip, then follow the task sheet
        ChatActionScreen(action = ChatAction.CallBack, onBack = { /* pop */ })
    }
}

// snippet: flow-call-back / ask
@Composable
internal fun FlowCallBackAskSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.CallBack, step = "ask", onBack = { /* pop */ })
    }
}

// snippet: flow-call-back / dialer
@Composable
internal fun FlowCallBackDialerSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.CallBack, step = "dialer", onBack = { /* pop */ })
    }
}

// snippet: flow-call-back / done
@Composable
internal fun FlowCallBackDoneSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.CallBack, step = "done", onBack = { /* pop */ })
    }
}

// snippet: flow-call-back / missed-reason
@Composable
internal fun FlowCallBackMissedReasonSnippet() {
    EqualTheme {
        // The card's Call back opens the ask step
        ChatActionScreen(action = ChatAction.CallBack, missed = MissedCase.Reason, onBack = { /* pop */ })
    }
}

// snippet: flow-call-back / missed-name
@Composable
internal fun FlowCallBackMissedNameSnippet() {
    EqualTheme {
        // The card's Call back opens the ask step
        ChatActionScreen(action = ChatAction.CallBack, missed = MissedCase.Name, onBack = { /* pop */ })
    }
}

// snippet: flow-call-back / missed-unknown
@Composable
internal fun FlowCallBackMissedUnknownSnippet() {
    EqualTheme {
        // The card's Call back opens the ask step
        ChatActionScreen(action = ChatAction.CallBack, missed = MissedCase.Unknown, onBack = { /* pop */ })
    }
}

// ---- Flow: mute ----------------------------------------------------------------------------------

// snippet: flow-mute / live
@Composable
internal fun FlowMuteLiveSnippet() {
    EqualTheme {
        // Runs live from the chat: tap the chip, then follow the task sheet
        ChatActionScreen(action = ChatAction.Mute, onBack = { /* pop */ })
    }
}

// snippet: flow-mute / confirm
@Composable
internal fun FlowMuteConfirmSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.Mute, step = "confirm", onBack = { /* pop */ })
    }
}

// snippet: flow-mute / done
@Composable
internal fun FlowMuteDoneSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.Mute, step = "done", onBack = { /* pop */ })
    }
}

// ---- Flow: reply-whatsapp ------------------------------------------------------------------------

// snippet: flow-reply-whatsapp / live
@Composable
internal fun FlowReplyWhatsAppLiveSnippet() {
    EqualTheme {
        // Runs live from the chat: tap the chip, then follow the task sheet
        ChatActionScreen(action = ChatAction.ReplyWhatsApp, onBack = { /* pop */ })
    }
}

// snippet: flow-reply-whatsapp / draft
@Composable
internal fun FlowReplyWhatsAppDraftSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.ReplyWhatsApp, step = "draft", onBack = { /* pop */ })
    }
}

// snippet: flow-reply-whatsapp / sending
@Composable
internal fun FlowReplyWhatsAppSendingSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.ReplyWhatsApp, step = "sending", onBack = { /* pop */ })
    }
}

// snippet: flow-reply-whatsapp / edit
@Composable
internal fun FlowReplyWhatsAppEditSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.ReplyWhatsApp, step = "edit", onBack = { /* pop */ })
    }
}

// snippet: flow-reply-whatsapp / edit-long
@Composable
internal fun FlowReplyWhatsAppEditLongSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.ReplyWhatsApp, step = "edit-long", onBack = { /* pop */ })
    }
}

// snippet: flow-reply-whatsapp / done
@Composable
internal fun FlowReplyWhatsAppDoneSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.ReplyWhatsApp, step = "done", onBack = { /* pop */ })
    }
}

// ---- Flow: save-contact --------------------------------------------------------------------------

// snippet: flow-save-contact / live
@Composable
internal fun FlowSaveContactLiveSnippet() {
    EqualTheme {
        // Runs live from the chat: tap the chip, then follow the task sheet
        ChatActionScreen(action = ChatAction.SaveContact, onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / review
@Composable
internal fun FlowSaveContactReviewSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "review", onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / saved
@Composable
internal fun FlowSaveContactSavedSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "saved", onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / edit-ask
@Composable
internal fun FlowSaveContactEditAskSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "edit-ask", onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / form
@Composable
internal fun FlowSaveContactFormSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "form", keyboard = true, onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / form-outlined
@Composable
internal fun FlowSaveContactFormOutlinedSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "form-outlined", keyboard = true, onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / no-permission
@Composable
internal fun FlowSaveContactNoPermissionSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "no-permission", onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / resume
@Composable
internal fun FlowSaveContactResumeSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "resume", onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / granted
@Composable
internal fun FlowSaveContactGrantedSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "granted", onBack = { /* pop */ })
    }
}

// snippet: flow-save-contact / denied
@Composable
internal fun FlowSaveContactDeniedSnippet() {
    EqualTheme {
        ChatActionScreen(action = ChatAction.SaveContact, step = "denied", onBack = { /* pop */ })
    }
}

// ---- Flow: error-states ------------------------------------------------------------------------

// snippet: flow-error-states / generation
@Composable
internal fun FlowErrorStatesGenerationSnippet() {
    EqualTheme {
        ChatErrorScreen(state = ErrorState.Generation, onRetry = { /* retry */ })
    }
}

// snippet: flow-error-states / offline-reply
@Composable
internal fun FlowErrorStatesOfflineReplySnippet() {
    EqualTheme {
        ChatErrorScreen(state = ErrorState.OfflineReply, onRetry = { /* retry */ })
    }
}

// snippet: flow-error-states / voice
@Composable
internal fun FlowErrorStatesVoiceSnippet() {
    EqualTheme {
        ChatErrorScreen(state = ErrorState.Voice)
    }
}

// snippet: flow-error-states / offline-sheet
@Composable
internal fun FlowErrorStatesOfflineSheetSnippet() {
    EqualTheme {
        ChatErrorScreen(state = ErrorState.OfflineSheet, onRetry = { /* refresh */ })
    }
}

// snippet: flow-error-states / offline-screen
@Composable
internal fun FlowErrorStatesOfflineScreenSnippet() {
    EqualTheme {
        ChatErrorScreen(state = ErrorState.OfflineScreen, onRetry = { /* retry */ })
    }
}
