// Compose code shown on the docs site (Components → Button). Each function body is extracted by
// scripts/build-snippets.mjs; keep the `// snippet: <doc id> / <example title>` line above it.
// Debug source set only: compiled with the module, never shipped in the release AAR.
@file:Suppress("unused")

package ai.equal.ds.snippets

import ai.equal.ds.components.EqualButton
import ai.equal.ds.components.EqualButtonSize
import ai.equal.ds.components.EqualButtonVariant
import ai.equal.ds.components.EqualIconButton
import ai.equal.ds.components.EqualIconButtonVariant
import ai.equal.ds.components.EqualTextButton
import ai.equal.ds.icons.EqualIcons
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp

// snippet: button / Variants
@Composable
internal fun ButtonVariantsSnippet() {
    EqualButton(text = "Save", onClick = {})
    EqualButton(text = "Try Voices", onClick = {}, variant = EqualButtonVariant.Secondary)
    EqualButton(text = "Delete", onClick = {}, variant = EqualButtonVariant.Danger, leadingIcon = EqualIcons.Delete)
    EqualButton(text = "Save", onClick = {}, enabled = false)
}

// snippet: button / Sizes
@Composable
internal fun ButtonSizesSnippet() {
    EqualButton(text = "Apply", onClick = {}, size = EqualButtonSize.Sm, leadingIcon = EqualIcons.Add)
    EqualButton(text = "Save", onClick = {}, size = EqualButtonSize.Md)
    EqualButton(text = "Save", onClick = {}, size = EqualButtonSize.Lg)
    // Block = lg metrics at full width
    EqualButton(text = "Add New Instruction", onClick = {}, size = EqualButtonSize.Block, leadingIcon = EqualIcons.Add)
}

// snippet: button / Text and icon buttons
@Composable
internal fun ButtonTextAndIconSnippet() {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        EqualTextButton(text = "Edit", onClick = {})
        EqualTextButton(text = "Share", onClick = {}, leadingIcon = EqualIcons.Share)
        EqualTextButton(text = "Share Feedback", onClick = {}, trailingIcon = EqualIcons.ChevronRight)
        EqualTextButton(text = "Delete address", onClick = {}, danger = true)
    }
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        EqualIconButton(icon = EqualIcons.Back, contentDescription = "Back", onClick = {})
        EqualIconButton(icon = EqualIcons.Check, contentDescription = "Confirm", onClick = {}, variant = EqualIconButtonVariant.Primary)
    }
}

// snippet: button / Commit + revise
@Composable
internal fun ButtonCommitReviseSnippet() {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        EqualTextButton(text = "Cancel", onClick = {})
        EqualButton(text = "Turn off", onClick = {})
    }
}
