const vscode = require('vscode')
const path = require('path')
const fs = require('fs')

const styles = [
  // File explorer
  ".monaco-tree .monaco-tree-rows>.monaco-tree-row",
  // Action bar
  ".monaco-action-bar .action-item",
  // Tab bar
  ".monaco-workbench>.part.editor>.content>.one-editor-silo>.container>.title .tabs-container>.tab",
  ".monaco-workbench>.part.editor>.content>.one-editor-silo>.container>.title .monaco-icon-label:before",
  ".monaco-workbench>.part.editor>.content>.one-editor-silo>.container>.title .tabs-container>.tab .monaco-icon-label:before",
  ".monaco-workbench>.part.editor>.content>.one-editor-silo>.container>.title .tabs-container>.tab .tab-label a",
  ".monaco-workbench>.part.editor>.content>.one-editor-silo>.container>.title .tabs-container>.tab .tab-label span",
  ".monaco-workbench>.part.editor>.content>.one-editor-silo>.container>.title .title-label a",
  ".monaco-workbench>.part.editor>.content>.one-editor-silo>.container>.title .title-label span",
  // Tab bar dropdown (3 dots)
  ".dropdown>.dropdown-action",
  ".dropdown>.dropdown-label",

  // Code Folding
  ".monaco-editor .margin-view-overlays .folding",
  // Extensions list
  ".monaco-list-row",

  // Status bar
  ".monaco-workbench>.part.statusbar>.statusbar-item a:not([disabled]):not(.disabled)",
]

async function enable () {
  const baseDir = path.dirname(require.main.filename)
  const indexFile  = path.join(baseDir, 'vs', 'workbench', 'electron-browser', 'bootstrap', 'index.html')
  const mainFile = path.join(baseDir, 'vs', 'workbench', 'workbench.main.js')

  var index = fs.readFileSync(indexFile, 'utf-8')
  index = index.replace(/<!-- CUSTOM-POINTER_BEGIN -->[\s\S]*?<!-- CUSTOM-POINTER_END -->/, "")
  index = index.replace(/(<\/head>)/, "<!-- CUSTOM-POINTER_BEGIN --><style>" + styles.join(",") + "{cursor:default !important;}</style><!-- CUSTOM-POINTER_END --></head>")
  fs.writeFileSync(indexFile, index, 'utf-8')

  var main = fs.readFileSync(mainFile, 'utf-8')
  main = main.replace(/" "\+t\.NLS_UNSUPPORTED/, '(""&&t.NLS_UNSUPPORTED)')
  fs.writeFileSync(mainFile, main, 'utf-8')

  askToRestart("Custom Pointer has been enabled, restart to apply changes!")
}

async function disable () {
  const baseDir = path.dirname(require.main.filename)
  const indexFile  = path.join(baseDir, 'vs', 'workbench', 'electron-browser', 'bootstrap', 'index.html')
  const mainFile = path.join(baseDir, 'vs', 'workbench', 'workbench.main.js')

  var index = fs.readFileSync(indexFile, 'utf-8')
  index = index.replace(/<!-- CUSTOM-POINTER_BEGIN -->[\s\S]*?<!-- CUSTOM-POINTER_END -->/, "<!-- CUSTOM-POINTER_BEGIN --><!-- CUSTOM-POINTER_END -->")
  fs.writeFileSync(indexFile, index, 'utf-8')

  var main = fs.readFileSync(mainFile, 'utf-8')
  main = main.replace(/\(""&&t\.NLS_UNSUPPORTED\)/, '" "+t.NLS_UNSUPPORTED')
  fs.writeFileSync(mainFile, main, 'utf-8')

  askToRestart("Custom Pointer has been disabled, restart to apply changes!")
}

exports.enable = enable
exports.disable = disable

// --

function askToRestart(msg) {
  vscode.window.showInformationMessage(msg, { title: "Restart" })
    .then(() =>
      vscode.commands.executeCommand("workbench.action.reloadWindow")
    )
}
