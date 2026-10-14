package ai.equal.ds.components

import ai.equal.ds.theme.EqualTheme
import ai.equal.ds.tokens.EqualRadius
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties

/**
 * Dialog surface (derived). Width 312, radius 24, padding 24, `bg/surface`. Title `title` →
 * subject `caption` `text/tertiary` → body `body1` `text/secondary` → right-aligned actions:
 * text button (revise / cancel) + filled commit (or danger when [destructive]).
 * Use [EqualDialog] to show it in a window.
 */
@Composable
fun EqualDialogContent(
    title: String,
    body: String,
    confirmLabel: String,
    onConfirm: () -> Unit,
    modifier: Modifier = Modifier,
    subject: String? = null,
    dismissLabel: String? = "Cancel",
    onDismiss: () -> Unit = {},
    destructive: Boolean = false,
) {
    val colors = EqualTheme.colors
    val type = EqualTheme.type
    Column(
        modifier
            .width(312.dp)
            .background(colors.bgSurface, RoundedCornerShape(EqualRadius.r2xl))
            .padding(24.dp),
    ) {
        EqualText(text = title, style = type.title, color = colors.textPrimary)
        if (subject != null) {
            EqualText(text = subject, style = type.caption, color = colors.textTertiary)
        }
        Spacer(Modifier.height(8.dp))
        EqualText(text = body, style = type.body1, color = colors.textSecondary)
        Spacer(Modifier.height(24.dp))
        Row(
            Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp, Alignment.End),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (dismissLabel != null) {
                EqualTextButton(text = dismissLabel, onClick = onDismiss)
            }
            EqualButton(
                text = confirmLabel,
                onClick = onConfirm,
                variant = if (destructive) EqualButtonVariant.Danger else EqualButtonVariant.Primary,
            )
        }
    }
}

/** [EqualDialogContent] in a platform dialog window. */
@Composable
fun EqualDialog(
    onDismissRequest: () -> Unit,
    title: String,
    body: String,
    confirmLabel: String,
    onConfirm: () -> Unit,
    subject: String? = null,
    dismissLabel: String? = "Cancel",
    destructive: Boolean = false,
) {
    Dialog(
        onDismissRequest = onDismissRequest,
        properties = DialogProperties(usePlatformDefaultWidth = false),
    ) {
        EqualDialogContent(
            title = title,
            body = body,
            confirmLabel = confirmLabel,
            onConfirm = onConfirm,
            subject = subject,
            dismissLabel = dismissLabel,
            onDismiss = onDismissRequest,
            destructive = destructive,
        )
    }
}

/**
 * Empty / error state (derived). Illustration slot 96 → title `subheading` → body `captionWrap`
 * `text/tertiary` (centred) → optional `md` button.
 */
@Composable
fun EmptyState(
    title: String,
    body: String,
    modifier: Modifier = Modifier,
    illustration: (@Composable () -> Unit)? = null,
    actionLabel: String? = null,
    onActionClick: () -> Unit = {},
) {
    val colors = EqualTheme.colors
    Column(
        modifier
            .fillMaxWidth()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        if (illustration != null) {
            Box(Modifier.size(96.dp), contentAlignment = Alignment.Center) { illustration() }
            Spacer(Modifier.height(16.dp))
        }
        EqualText(text = title, style = EqualTheme.type.subheading, color = colors.textPrimary, textAlign = TextAlign.Center)
        Spacer(Modifier.height(4.dp))
        EqualText(text = body, style = EqualTheme.type.captionWrap, color = colors.textTertiary, textAlign = TextAlign.Center)
        if (actionLabel != null) {
            Spacer(Modifier.height(16.dp))
            EqualButton(text = actionLabel, onClick = onActionClick)
        }
    }
}

/**
 * Snackbar / toast (derived). Fill `text/primary`, text `body1` in `bg/surface`, radius 12,
 * padding 12 v / 16 h, optional action in `text/action` (lime in dark, as tokenised).
 */
@Composable
fun EqualSnackbar(
    message: String,
    modifier: Modifier = Modifier,
    actionLabel: String? = null,
    onActionClick: () -> Unit = {},
) {
    val colors = EqualTheme.colors
    val type = EqualTheme.type
    Row(
        modifier
            .fillMaxWidth()
            .background(colors.textPrimary, RoundedCornerShape(EqualRadius.rMd))
            .padding(horizontal = 16.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        EqualText(text = message, style = type.body1, color = colors.bgSurface, modifier = Modifier.weight(1f))
        if (actionLabel != null) {
            Spacer(Modifier.width(12.dp))
            EqualText(
                text = actionLabel,
                style = type.button,
                color = colors.textAction,
                maxLines = 1,
                modifier = Modifier.clickable(role = Role.Button, onClick = onActionClick),
            )
        }
    }
}

@EqualPreviews
@Composable
private fun OverlaysPreview() {
    PreviewFrame {
        EqualDialogContent(
            title = "Delete instruction?",
            subject = "When a delivery partner calls",
            body = "Equal AI will stop following this instruction.",
            confirmLabel = "Delete",
            onConfirm = {},
            destructive = true,
        )
        VSpace(16.dp)
        EmptyState(title = "No chats yet", body = "Calls Equal AI answers will show up here.", actionLabel = "Set up assistant")
        VSpace(16.dp)
        EqualSnackbar(message = "Chat deleted", actionLabel = "Undo")
    }
}
