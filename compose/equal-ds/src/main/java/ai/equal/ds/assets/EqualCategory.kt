package ai.equal.ds.assets

import ai.equal.ds.R
import androidx.annotation.DrawableRes

/**
 * Caller categories. Each maps to a real image at
 * `res/drawable-xxxhdpi/ds_category_<name>.webp`: a full circle with its own coloured background
 * baked in and transparent corners. Render with `CategoryAvatar`; never add a background circle
 * behind it and never crop it.
 *
 * [NA] ("Unknown") is the default avatar for unknown callers.
 */
enum class EqualCategory(@DrawableRes val res: Int, val label: String) {
    Career(R.drawable.ds_category_career, "Career"),
    Delivery(R.drawable.ds_category_delivery, "Delivery"),
    Education(R.drawable.ds_category_education, "Education"),
    Financial(R.drawable.ds_category_financial, "Financial"),
    GateAlert(R.drawable.ds_category_gate_alert, "Gate alert"),
    HomeServices(R.drawable.ds_category_home_services, "Home services"),
    NA(R.drawable.ds_category_na, "Unknown"),
    OrderConfirmation(R.drawable.ds_category_order_confirmation, "Order confirmation"),
    Others(R.drawable.ds_category_others, "Others"),
    Others1(R.drawable.ds_category_others_1, "Others"),
    OTP(R.drawable.ds_category_otp, "OTP"),
    Political(R.drawable.ds_category_political, "Political"),
    RealEstate(R.drawable.ds_category_real_estate, "Real estate"),
    Ride(R.drawable.ds_category_ride, "Ride"),
    Services(R.drawable.ds_category_services, "Services"),
    Travel(R.drawable.ds_category_travel, "Travel"),
}
