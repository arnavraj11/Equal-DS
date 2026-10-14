package ai.equal.ds.components

import ai.equal.ds.R
import ai.equal.ds.icons.EqualIcons
import ai.equal.ds.icons.EqualLogoPaths
import ai.equal.ds.icons.EqualLogoVariant
import ai.equal.ds.icons.equalLogoVector
import ai.equal.ds.theme.EqualTheme
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.ColorMatrix
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/** Share of the orb image canvas taken by the opaque orb; the outer 10% on each side is glow. */
private const val OrbFraction = 0.8f

/**
 * The Equal logo orb (real image). Light mode uses `ds_logo_orb_light` (green orb, white dots),
 * dark mode uses `ds_logo_orb_dark` (lime orb, black dots), picked from `EqualTheme.colors.isDark`.
 *
 * The layout is exactly [size] and the opaque orb matches it. The image is drawn at
 * `size / 0.8`, centred, so its soft glow overflows the layout bounds. Don't clip the parent
 * if you want to keep the glow.
 */
@Composable
fun EqualLogoOrb(
    size: Dp,
    modifier: Modifier = Modifier,
    contentDescription: String? = "Equal AI",
) {
    val res = if (EqualTheme.colors.isDark) R.drawable.ds_logo_orb_dark else R.drawable.ds_logo_orb_light
    Box(modifier.size(size), contentAlignment = Alignment.Center) {
        Image(
            painter = painterResource(id = res),
            contentDescription = contentDescription,
            // requiredSize ignores the parent's size constraint and centres the overflow.
            modifier = Modifier.requiredSize(size / OrbFraction),
            contentScale = ContentScale.Fit,
        )
    }
}

/** AI avatar sizes (SPEC §12). */
enum class AiAvatarSize(val diameter: Dp) {
    Small(24.dp),
    Medium(36.dp),
    Large(48.dp),
}

/** AI assistant avatar (SPEC §12): the [EqualLogoOrb] at 24 / 36 / 48. */
@Composable
fun AiAvatar(
    modifier: Modifier = Modifier,
    size: AiAvatarSize = AiAvatarSize.Medium,
    contentDescription: String? = "Equal AI",
) {
    EqualLogoOrb(size = size.diameter, modifier = modifier, contentDescription = contentDescription)
}

/**
 * The six-dot brand mark (traced from the official logo), sized by width. Height follows the
 * 488:428 aspect ratio.
 */
@Composable
fun EqualMark(
    width: Dp,
    color: Color,
    modifier: Modifier = Modifier,
    contentDescription: String? = null,
) {
    Image(
        imageVector = EqualIcons.EqualMark,
        contentDescription = contentDescription,
        modifier = modifier
            .width(width)
            .aspectRatio(488f / 428f),
        contentScale = ContentScale.Fit,
        colorFilter = ColorFilter.tint(color),
    )
}

/**
 * Full Equal AI logo: six-dot mark + "equal ai" wordmark, from the official vector
 * (113 × 24). Colour defaults to `text/action`: #00B140 in light, lime in dark (follows the orb).
 */
@Composable
fun EqualLogo(
    modifier: Modifier = Modifier,
    height: Dp = 20.dp,
    color: Color = EqualTheme.colors.textAction,
    variant: EqualLogoVariant = EqualLogoVariant.FULL,
    contentDescription: String? = "Equal AI",
) {
    val vector = remember(color, variant) { equalLogoVector(color, variant) }
    val width = when (variant) {
        EqualLogoVariant.FULL -> EqualLogoPaths.WIDTH
        EqualLogoVariant.MARK -> EqualLogoPaths.MARK_WIDTH
        EqualLogoVariant.WORDMARK -> EqualLogoPaths.WIDTH - EqualLogoPaths.WORDMARK_X
    }
    Image(
        imageVector = vector,
        contentDescription = contentDescription,
        modifier = modifier
            .height(height)
            .aspectRatio(width / EqualLogoPaths.HEIGHT),
        contentScale = ContentScale.Fit,
    )
}

// Mascot artwork bounds inside its 4096 × 4430 canvas (measured from the alpha channel).
private const val MASCOT_W = 4096f
private const val MASCOT_H = 4430f
private const val MASCOT_BOX_X = 597f
private const val MASCOT_BOX_Y = 799f
private const val MASCOT_BOX_W = 2915f
private const val MASCOT_BOX_H = 2907f

/**
 * Equal AI robot mascot (asset `ds_asset_mascot_robot`), used on the "AI Assistant is On" card.
 * The file keeps its transparent padding (never cropped); it is drawn scaled and offset so the
 * robot itself fills [size] × [size]. [dimmed] = greyscale at 70% (assistant off).
 */
@Composable
fun EqualMascot(
    modifier: Modifier = Modifier,
    size: Dp = 40.dp,
    dimmed: Boolean = false,
    contentDescription: String? = "Equal assistant",
) {
    val scale = size.value / maxOf(MASCOT_BOX_W, MASCOT_BOX_H)
    val left = (-MASCOT_BOX_X * scale + (size.value - MASCOT_BOX_W * scale) / 2f).dp
    val top = (-MASCOT_BOX_Y * scale + (size.value - MASCOT_BOX_H * scale) / 2f).dp
    val greyscale = remember { ColorFilter.colorMatrix(ColorMatrix().apply { setToSaturation(0f) }) }
    Box(modifier.size(size)) {
        Image(
            painter = painterResource(R.drawable.ds_asset_mascot_robot),
            contentDescription = contentDescription,
            modifier = Modifier
                .wrapContentSize(align = Alignment.TopStart, unbounded = true)
                .offset(x = left, y = top)
                .size(width = (MASCOT_W * scale).dp, height = (MASCOT_H * scale).dp),
            contentScale = ContentScale.FillBounds,
            colorFilter = if (dimmed) greyscale else null,
            alpha = if (dimmed) 0.7f else 1f,
        )
    }
}

@EqualPreviews
@Composable
private fun AiAvatarPreview() {
    PreviewFrame {
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            AiAvatar(size = AiAvatarSize.Small)
            AiAvatar(size = AiAvatarSize.Medium)
            AiAvatar(size = AiAvatarSize.Large)
            EqualLogoOrb(size = 58.dp)
            EqualMark(width = 23.dp, color = EqualTheme.colors.textAction)
            EqualLogo(height = 20.dp)
            EqualMascot(size = 40.dp)
        }
    }
}
