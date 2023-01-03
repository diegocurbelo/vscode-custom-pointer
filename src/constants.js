const path = require( 'path' )

const BASE_DIR = path.dirname( require.main.filename )
const WORKBENCH_MAIN_CSS_FILE = path.join( BASE_DIR, 'vs', 'workbench', 'workbench.desktop.main.css' )

const CSS_SELECTORS = [
	// General
	".monaco-text-button",
	".monaco-dropdown>.dropdown-label",
	".monaco-custom-checkbox",
	".monaco-list.mouse-support .monaco-list-row",
	".monaco-pane-view .pane>.pane-header",

	// Action bar
	".monaco-action-bar .action-item",

	// Editor General
	".monaco-workbench .part.editor>.content .editor-group-container>.title .monaco-icon-label:before",
	".monaco-editor .find-widget .button",

	// Editor - Tab bar
	".monaco-workbench .part.editor>.content .editor-group-container>.title .tabs-container",
	".monaco-workbench .part.editor>.content .editor-group-container>.title .tabs-container>.tab",
	".monaco-workbench .part.editor>.content .editor-group-container>.title .tabs-container>.tab .tab-label a",
	".monaco-workbench .part.editor>.content .editor-group-container>.title .tabs-container>.tab .tab-close a",
	".monaco-workbench .part.editor>.content .editor-group-container>.title .tabs-container>.tab span",

	// Breadcrumbs
	".monaco-breadcrumbs .monaco-breadcrumb-item",

	// Margin view
	".monaco-editor .margin-view-overlays .cgmr",
	".monaco-editor .margin-view-overlays .codicon-chevron-down",
	".monaco-editor .margin-view-overlays .codicon-chevron-right",

	// Seach view
	".search-view .search-widget .toggle-replace-button",
	".search-view .query-details .more",

	// Status bar
	".monaco-workbench .part.statusbar>.items-container>.statusbar-item>a",
]

module.exports = {
    CSS_SELECTORS,
    WORKBENCH_MAIN_CSS_FILE,
}
