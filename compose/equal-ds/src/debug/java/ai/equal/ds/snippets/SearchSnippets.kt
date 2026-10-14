// Compose code shown on the docs site for Search: the component page ("search / <example title>"),
// the Screens overview ("screens / search") and the flow page ("flow-search / <state key>", the keys
// of the phones on the page). Extracted by scripts/build-snippets.mjs; debug source set only.
@file:Suppress("unused")

package ai.equal.ds.snippets

import ai.equal.ds.assets.EqualAssets
import ai.equal.ds.assets.EqualCategory
import ai.equal.ds.catalog.SearchScreen
import ai.equal.ds.catalog.SearchState
import ai.equal.ds.components.EqualDivider
import ai.equal.ds.components.LoadingDots
import ai.equal.ds.components.MessageResult
import ai.equal.ds.components.RecentSearch
import ai.equal.ds.components.RecentSearches
import ai.equal.ds.components.SearchBar
import ai.equal.ds.components.SearchSection
import ai.equal.ds.components.SearchState as SearchStateView
import ai.equal.ds.theme.EqualTheme
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.unit.dp

// ---- Components --------------------------------------------------------------------------------

// snippet: search / Search bar
@Composable
internal fun SearchBarSnippet() {
    var q by remember { mutableStateOf("") }
    SearchBar(value = q, onValueChange = { q = it }, onBack = {}, autoFocus = true)
}

// snippet: search / Recent searches
@Composable
internal fun RecentSearchesSnippet() {
    var q by remember { mutableStateOf("") }
    var recent by remember {
        mutableStateOf(
            listOf(
                RecentSearch("Amit Nanda", EqualCategory.Career),
                RecentSearch("Shankar", EqualCategory.Ride),
                RecentSearch("DSR Builder", EqualCategory.Financial),
            ),
        )
    }
    Column {
        SearchBar(value = q, onValueChange = { q = it })
        SearchSection(title = "Recent searches", onClear = { recent = emptyList() })
        RecentSearches(items = recent, onPick = { q = it })
    }
}

// snippet: search / Message results
@Composable
internal fun MessageResultsSnippet() {
    val q = "Sa"
    Column {
        SearchSection(title = "Messages")
        MessageResult(name = "Santosh Anna", time = "3:02 PM", text = "Caller said that they’ll call you in the evening", query = q, onClick = {})
        EqualDivider()
        MessageResult(name = "Amit Nanda", time = "3:02 PM", text = "Same address, near Gachibowli", query = q, onClick = {})
    }
}

// snippet: search / States
@Composable
internal fun SearchStatesSnippet() {
    Column {
        // Compose: SearchState takes an EqualAssets illustration and a size in dp
        SearchStateView(art = EqualAssets.IllustrationSearch, size = 170.dp, title = "Search across your calls", body = "Look for names, phone numbers, categories, keywords")
        SearchStateView(art = EqualAssets.IllustrationNoInternet, size = 130.dp, title = "No internet connection", body = "We could not connect to a stable internet. Check your connection and try again.")
        SearchStateView(art = EqualAssets.IllustrationNoResults, size = 150.dp, title = "No results found", body = "Couldn’t find anything matching. Try a different name, number, category or keyword")
        LoadingDots()
    }
}

// ---- Screens -----------------------------------------------------------------------------------

// snippet: screens / search
@Composable
internal fun ScreenSearchSnippet() {
    EqualTheme {
        SearchScreen(onBack = {}, onOpenChat = {})
    }
}

// ---- Flow: Search ------------------------------------------------------------------------------

// snippet: flow-search / empty
@Composable
internal fun FlowSearchEmptySnippet() {
    EqualTheme {
        // keyboard = true draws the system keyboard stand-in (docs only)
        SearchScreen(state = SearchState.Empty, keyboard = true)
    }
}

// snippet: flow-search / offline
@Composable
internal fun FlowSearchOfflineSnippet() {
    EqualTheme {
        SearchScreen(state = SearchState.Offline, keyboard = true)
    }
}

// snippet: flow-search / recent
@Composable
internal fun FlowSearchRecentSnippet() {
    EqualTheme {
        // Live: type to run loading → chats → messages
        SearchScreen(keyboard = true)
    }
}

// snippet: flow-search / no-results
@Composable
internal fun FlowSearchNoResultsSnippet() {
    EqualTheme {
        SearchScreen(state = SearchState.NoResults, query = "Xyz", keyboard = true)
    }
}

// snippet: flow-search / loading
@Composable
internal fun FlowSearchLoadingSnippet() {
    EqualTheme {
        SearchScreen(state = SearchState.Loading, query = "S", keyboard = true)
    }
}

// snippet: flow-search / results
@Composable
internal fun FlowSearchResultsSnippet() {
    EqualTheme {
        SearchScreen(state = SearchState.Results, query = "S", keyboard = true)
    }
}

// snippet: flow-search / messages-loading
@Composable
internal fun FlowSearchMessagesLoadingSnippet() {
    EqualTheme {
        SearchScreen(state = SearchState.MessagesLoading, query = "S", keyboard = true)
    }
}

// snippet: flow-search / messages
@Composable
internal fun FlowSearchMessagesSnippet() {
    EqualTheme {
        SearchScreen(state = SearchState.Messages, query = "Sa", keyboard = true)
    }
}
