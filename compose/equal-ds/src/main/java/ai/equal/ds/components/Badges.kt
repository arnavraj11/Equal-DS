package ai.equal.ds.components

import ai.equal.ds.theme.EqualTheme
import ai.equal.ds.theme.toBrush
import ai.equal.ds.tokens.EqualPrimitives
import ai.equal.ds.tokens.EqualRadius
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/** Text badge "NEW" (SPEC §20): 16 high, h6, radius 4, `button/primary`, `badge` `text/on-action`. */
@Composable
fun NewBadge(
    modifier: Modifier = Modifier,
    text: String = "New",
) {
    val colors = EqualTheme.colors
    Box(
        modifier
            .height(16.dp)
            .background(colors.buttonPrimary, RoundedCornerShape(EqualRadius.rXs))
            .padding(horizontal = 6.dp),
        contentAlignment = Alignment.Center,
    ) {
        EqualText(text = text.uppercase(), style = EqualTheme.type.badge, color = colors.textOnAction, maxLines = 1)
    }
}

/**
 * Count badge (SPEC §20): 20 circle (min width 20, h5 padding for 2+ digits), `button/primary`,
 * `badgeCount` `text/on-action`. Counts above [max] render as "max+".
 */
@Composable
fun CountBadge(
    count: Int,
    modifier: Modifier = Modifier,
    max: Int = 99,
) {
    val colors = EqualTheme.colors
    val label = if (count > max) "$max+" else count.toString()
    val paddingH = if (label.length > 1) 5.dp else 0.dp
    Box(
        modifier
            .height(20.dp)
            .defaultMinSize(minWidth = 20.dp)
            .background(colors.buttonPrimary, CircleShape)
            .padding(horizontal = paddingH),
        contentAlignment = Alignment.Center,
    ) {
        EqualText(text = label, style = EqualTheme.type.badgeCount, color = colors.textOnAction, maxLines = 1)
    }
}

/**
 * Feature badge "NEW FEATURE" (SPEC §20): 24 high, pill, padding 8/10, `bg/surface`,
 * 1dp `badge/new-feature-stroke`, Unicode [emoji] 14 (default ⭐) + gap 6 + `badge` `text/secondary`.
 */
@Composable
fun FeatureBadge(
    modifier: Modifier = Modifier,
    text: String = "New feature",
    emoji: String? = "⭐",
) {
    val colors = EqualTheme.colors
    Row(
        modifier
            .height(24.dp)
            .background(colors.bgSurface, CircleShape)
            .border(1.dp, colors.badgeNewFeatureStroke, CircleShape)
            .padding(start = 8.dp, end = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (emoji != null) {
            EmojiGlyph(emoji = emoji, size = 11.dp)
            Spacer(Modifier.width(6.dp))
        }
        EqualText(text = text.uppercase(), style = EqualTheme.type.badge, color = colors.textSecondary, maxLines = 1)
    }
}

/** [PlanBadge] tone. */
enum class PlanBadgeTone {
    /** `gradient/gold`: the paid plan ("UNLIMITED"). */
    Paid,

    /** `plan-badge/expired-bg` (red): "PLAN EXPIRED" (Plan Expired touchpoint). */
    Expired,
}

/**
 * Plan badge "UNLIMITED" (SPEC §2): 16 high, h6, radius 4, `gradient/gold`, `badge` `text/on-dark`.
 * [PlanBadgeTone.Expired] is the red "PLAN EXPIRED" badge (`plan-badge/expired-bg`, white label).
 */
@Composable
fun PlanBadge(
    modifier: Modifier = Modifier,
    text: String = "Unlimited",
    tone: PlanBadgeTone = PlanBadgeTone.Paid,
) {
    val fill = if (tone == PlanBadgeTone.Expired) {
        Modifier.background(EqualTheme.colors.planBadgeExpiredBg, RoundedCornerShape(EqualRadius.rXs))
    } else {
        Modifier.background(EqualTheme.gradients.gold.toBrush(), RoundedCornerShape(EqualRadius.rXs))
    }
    Box(
        modifier
            .height(16.dp)
            .then(fill)
            .padding(horizontal = 6.dp),
        contentAlignment = Alignment.Center,
    ) {
        EqualText(
            text = text.uppercase(),
            style = EqualTheme.type.badge,
            color = if (tone == PlanBadgeTone.Expired) EqualPrimitives.white else EqualTheme.colors.textOnDark,
            maxLines = 1,
        )
    }
}

@EqualPreviews
@Composable
private fun BadgesPreview() {
    PreviewFrame {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            NewBadge()
            CountBadge(3)
            CountBadge(42)
            FeatureBadge()
            PlanBadge()
            PlanBadge(text = "Plan Expired", tone = PlanBadgeTone.Expired)
        }
    }
}
