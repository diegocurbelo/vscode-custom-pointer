const vscode = require('vscode')
const path = require('path')
const fs = require('fs')

const baseDir = path.dirname(require.main.filename)
const indexFile  = path.join(baseDir, 'vs', 'workbench', 'electron-browser', 'bootstrap', 'index.html')
const mainFile = path.join(baseDir, 'vs', 'workbench', 'workbench.main.js')

const selectors = [
  // Sidebar
  // - Action bar
  ".monaco-action-bar .action-item",
  // - File explorer
  ".monaco-tree .monaco-tree-rows>.monaco-tree-row",
  // - Left panel headers (outline, variables, etc)
  ".monaco-panel-view .panel>.panel-header",
  // - Extensions list
  ".monaco-list-row",

  // Tab bar
  ".monaco-workbench>.part.editor>.content .editor-group-container>.title .tabs-container>.tab",
  ".monaco-workbench>.part.editor>.content .editor-group-container>.title .monaco-icon-label:before",
  ".monaco-workbench>.part.editor>.content .editor-group-container>.title .tabs-container>.tab .monaco-icon-label:before",
  ".monaco-workbench>.part.editor>.content .editor-group-container>.title .tabs-container>.tab .tab-label a",
  ".monaco-workbench>.part.editor>.content .editor-group-container>.title .tabs-container>.tab .tab-label span",
  ".monaco-workbench>.part.editor>.content .editor-group-container>.title .title-label a",
  ".monaco-workbench>.part.editor>.content .editor-group-container>.title .title-label span",
  
  // Tab bar dropdown (3 dots)
  ".monaco-dropdown>.dropdown-action",
  ".monaco-dropdown>.dropdown-label",
  
  // Code Folding
  ".monaco-editor .margin-view-overlays .folding",

  // Status bar
  ".monaco-workbench>.part.statusbar>.statusbar-item a:not([disabled]):not(.disabled)",

  // General buttons
  ".monaco-text-button"

]

const styles = '<style>' + selectors.join(',') + '{cursor:default !important;}</style>'


async function enable () {
  var index = fs.readFileSync(indexFile, 'utf-8')
  index = index.replace(/<!-- CUSTOM-POINTER_BEGIN .*? CUSTOM-POINTER_END -->/, '')
  index = index.replace(/(<\/head>)/, `<!-- CUSTOM-POINTER_BEGIN [${getVersion()}] -->${styles}<!-- CUSTOM-POINTER_END --></head>`)
  fs.writeFileSync(indexFile, index, 'utf-8')

  var main = fs.readFileSync(mainFile, 'utf-8')
  main = main.replace(/" "\+t\.NLS_UNSUPPORTED/, '(""&&t.NLS_UNSUPPORTED)')
  fs.writeFileSync(mainFile, main, 'utf-8')

  askToRestart('Custom Pointer has been enabled, restart to apply changes!')
}

async function disable () {
  var index = fs.readFileSync(indexFile, 'utf-8')
  index = index.replace(
    /<!-- CUSTOM-POINTER_BEGIN .*? CUSTOM-POINTER_END -->/,
    '<!-- CUSTOM-POINTER_BEGIN [disabled] --><!-- CUSTOM-POINTER_END -->')
  fs.writeFileSync(indexFile, index, 'utf-8')

  askToRestart('Custom Pointer has been disabled, restart to apply changes!')
}

async function update() {
  var index = fs.readFileSync(indexFile, 'utf-8')
  index = index.replace(
    /<!-- CUSTOM-POINTER_BEGIN .*? CUSTOM-POINTER_END -->/,
    `<!-- CUSTOM-POINTER_BEGIN [${getVersion()}] -->${styles}<!-- CUSTOM-POINTER_END -->`)
  fs.writeFileSync(indexFile, index, 'utf-8')

  askToRestart('Custom Pointer has been updated, restart to apply changes!')
}

async function remove() {
  var index = fs.readFileSync(indexFile, 'utf-8')
  index = index.replace(/<!-- CUSTOM-POINTER_BEGIN .*? CUSTOM-POINTER_END -->/, '')
  fs.writeFileSync(indexFile, index, 'utf-8')

  var main = fs.readFileSync(mainFile, 'utf-8')
  main = main.replace(/\(""&&t\.NLS_UNSUPPORTED\)/, '" "+t.NLS_UNSUPPORTED')
  fs.writeFileSync(mainFile, main, 'utf-8')

  askToRestart('Custom Pointer has been removed, uninstall the extension and restart VS Code')
}

exports.enable = enable
exports.disable = disable
exports.update = update
exports.remove = remove

// --

function askToRestart(msg) {
  vscode.window.showInformationMessage(msg, { title: "Restart" })
    .then(() =>
      vscode.commands.executeCommand("workbench.action.reloadWindow")
    )
}

function getVersion() {
  return vscode.extensions.getExtension('diegocurbelo.custom-pointer').packageJSON.version
}
