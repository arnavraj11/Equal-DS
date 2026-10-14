// Compose code shown on the docs site for the Plan value & renewal flow page (keys:
// "flow-plan-renewal / <state key>", the keys of the phones on the page). Extracted by
// scripts/build-snippets.mjs; debug source set only: compiled with the module, never shipped in
// the release AAR.
@file:Suppress("unused")

package ai.equal.ds.snippets

import ai.equal.ds.catalog.HomeScreenSample
import ai.equal.ds.catalog.PaywallOverlay
import ai.equal.ds.catalog.PaywallScreen
import ai.equal.ds.catalog.PaywallTouchpoint
import ai.equal.ds.catalog.SubscriptionScreen
import ai.equal.ds.catalog.SubscriptionState
import ai.equal.ds.catalog.YouPlan
import ai.equal.ds.catalog.YouScreenSample
import ai.equal.ds.components.MeetAssistantCard
import ai.equal.ds.components.PlanExpiry
import ai.equal.ds.components.PlanTier
import ai.equal.ds.components.Quota
import ai.equal.ds.components.ValueSheetVariant
import ai.equal.ds.theme.EqualTheme
import androidx.compose.runtime.Composable

// snippet: flow-plan-renewal / home-expiring
@Composable
internal fun FlowPlanRenewalHomeExpiringSnippet() {
    EqualTheme {
        // Amber strip under the header; Renew Now opens the paywall
        HomeScreenSample(
            planExpiry = PlanExpiry.Expiring(days = 2),
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / home-today
@Composable
internal fun FlowPlanRenewalHomeTodaySnippet() {
    EqualTheme {
        HomeScreenSample(
            planExpiry = PlanExpiry.Today,
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / home-expired
@Composable
internal fun FlowPlanRenewalHomeExpiredSnippet() {
    EqualTheme {
        HomeScreenSample(
            tier = PlanTier.Free,
            planExpiry = PlanExpiry.Expired(date = "30th July"),
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / value-sheet
@Composable
internal fun FlowPlanRenewalValueSheetSnippet() {
    EqualTheme {
        // After a call near the end of the plan: What Unlimited saved you; close or the scrim hides it
        HomeScreenSample(
            planExpiry = PlanExpiry.Expiring(days = 3),
            valueSheet = ValueSheetVariant.Card,
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / value-sheet-flush
@Composable
internal fun FlowPlanRenewalValueSheetFlushSnippet() {
    EqualTheme {
        // Experiment: the value card is the sheet
        HomeScreenSample(
            planExpiry = PlanExpiry.Expiring(days = 3),
            valueSheet = ValueSheetVariant.Flush,
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / value-sheet-today
@Composable
internal fun FlowPlanRenewalValueSheetTodaySnippet() {
    EqualTheme {
        HomeScreenSample(
            planExpiry = PlanExpiry.Today,
            valueSheet = ValueSheetVariant.Card,
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / value-sheet-expired
@Composable
internal fun FlowPlanRenewalValueSheetExpiredSnippet() {
    EqualTheme {
        HomeScreenSample(
            tier = PlanTier.Free,
            planExpiry = PlanExpiry.Expired(date = "30th July"),
            valueSheet = ValueSheetVariant.Card,
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / quota-left
@Composable
internal fun FlowPlanRenewalQuotaLeftSnippet() {
    EqualTheme {
        // Free plan: 6 out of 30 Calls Left; Get Equal AI Unlimited opens the paywall
        HomeScreenSample(
            tier = PlanTier.Free,
            quotaSheet = Quota(used = 24, limit = 30, resetsInDays = 4),
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / quota-limit
@Composable
internal fun FlowPlanRenewalQuotaLimitSnippet() {
    EqualTheme {
        // Limit Reached · 30 out of 30 (100%); rows from the 5th on are locked
        HomeScreenSample(
            tier = PlanTier.Free,
            lockedFrom = 4,
            quotaSheet = Quota(used = 30, limit = 30, resetsInDays = 2),
            promo = { MeetAssistantCard(onCallClick = {}, onDismiss = {}) },
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / you-active
@Composable
internal fun FlowPlanRenewalYouActiveSnippet() {
    EqualTheme {
        YouScreenSample(plan = YouPlan.Active, onManagePlan = { /* open SubscriptionScreen() */ })
    }
}

// snippet: flow-plan-renewal / manage-active
@Composable
internal fun FlowPlanRenewalManageActiveSnippet() {
    EqualTheme {
        // Value card (plan active until), What You Get, proof, FAQ; Cancel Subscription pinned
        SubscriptionScreen()
    }
}

// snippet: flow-plan-renewal / you-expired
@Composable
internal fun FlowPlanRenewalYouExpiredSnippet() {
    EqualTheme {
        // Red "Plan Expired" pill, plain avatar; Manage plan opens the renewal page
        YouScreenSample(
            tier = PlanTier.Free,
            plan = YouPlan.Expired,
            onManagePlan = { /* open SubscriptionScreen(state = SubscriptionState.Expired) */ },
        )
    }
}

// snippet: flow-plan-renewal / manage-expired
@Composable
internal fun FlowPlanRenewalManageExpiredSnippet() {
    EqualTheme {
        SubscriptionScreen(
            state = SubscriptionState.Expired,
            onRenew = { /* open PaywallScreen(cta = "Get Equal AI Unlimited") */ },
        )
    }
}

// snippet: flow-plan-renewal / renew-paywall
@Composable
internal fun FlowPlanRenewalRenewPaywallSnippet() {
    EqualTheme {
        // APPLY strikes ₹249, lands ₹149 with "Saved ₹100" and pops Special Coupon Applied!
        PaywallScreen(touchpoint = PaywallTouchpoint.ChatList, cta = "Get Equal AI Unlimited")
    }
}

// snippet: flow-plan-renewal / progress
@Composable
internal fun FlowPlanRenewalProgressSnippet() {
    EqualTheme {
        // Connecting To Razorpay → Waiting for Confirmation → Verifying Transaction (every 1.4s)
        PaywallScreen(overlay = PaywallOverlay.Waiting, cta = "Get Equal AI Unlimited")
    }
}

// snippet: flow-plan-renewal / confirmed
@Composable
internal fun FlowPlanRenewalConfirmedSnippet() {
    EqualTheme {
        // Payment Confirmed with the ray burst behind the seal
        PaywallScreen(overlay = PaywallOverlay.Confirmed, cta = "Get Equal AI Unlimited")
    }
}
