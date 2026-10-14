package ai.equal.ds.theme

import ai.equal.ds.R
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.googlefonts.Font
import androidx.compose.ui.text.googlefonts.GoogleFont

/**
 * Downloadable-font provider backed by Google Play Services.
 * Certificates live in `res/values/font_certs.xml`.
 */
internal val EqualGoogleFontProvider = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs,
)

private val DmSansGoogleFont = GoogleFont("DM Sans")

/**
 * DM Sans: Regular 400, Medium 500, Bold 700 (reserved) and Italic 400.
 * Semibold 600 is intentionally absent (Typography rule 9).
 *
 * While the font downloads (or on devices without Play Services) the platform
 * default sans-serif is used.
 */
val DmSans: FontFamily = FontFamily(
    Font(googleFont = DmSansGoogleFont, fontProvider = EqualGoogleFontProvider, weight = FontWeight.W400),
    Font(googleFont = DmSansGoogleFont, fontProvider = EqualGoogleFontProvider, weight = FontWeight.W500),
    Font(googleFont = DmSansGoogleFont, fontProvider = EqualGoogleFontProvider, weight = FontWeight.W600),
    Font(googleFont = DmSansGoogleFont, fontProvider = EqualGoogleFontProvider, weight = FontWeight.W700),
    Font(
        googleFont = DmSansGoogleFont,
        fontProvider = EqualGoogleFontProvider,
        weight = FontWeight.W400,
        style = FontStyle.Italic,
    ),
)
