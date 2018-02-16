const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

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
];

// this method is called when your extension is activated
function activate(context) {
  console.log("[Custom Pointer]", "loaded!");
  const index = path.dirname(require.main.filename) + "/vs/workbench/electron-browser/bootstrap/index.html";
  try {
    var html = fs.readFileSync(index, 'utf-8');

    // Check if the index file is already patched!
    const patched = /<!-- CUSTOM-POINTER_BEGIN -->/.test(html);
    if (!patched) {
        addStyles(index, html);
    }
  } catch (e) {
    console.log(e);
  }

  // The command has been defined in the package.json file
  let installCommand = vscode.commands.registerCommand('extension.activate', function () {
    addStyles(index, html);
  });
  let removeCommand = vscode.commands.registerCommand('extension.deactivate', function () {
    removeStyles(index, html);
  });

  context.subscriptions.push(installCommand);
  context.subscriptions.push(removeCommand);
}

function addStyles(index, html) {
  html = html.replace(/<!-- CUSTOM-POINTER_BEGIN -->[\s\S]*?<!-- CUSTOM-POINTER_END -->/, "");
  html = html.replace(/(<\/head>)/, "<!-- CUSTOM-POINTER_BEGIN --><style>" + styles.join(",") + "{cursor:default !important;}</style><!-- CUSTOM-POINTER_END --></head>");
  fs.writeFileSync(index, html, 'utf-8');
  askToRestart("Custom Pointer has been activated, restart to apply changes!");
}

function removeStyles(index, html) {
  html = html.replace(/<!-- CUSTOM-POINTER_BEGIN -->[\s\S]*?<!-- CUSTOM-POINTER_END -->/, "<!-- CUSTOM-POINTER_BEGIN --><!-- CUSTOM-POINTER_END -->");
  fs.writeFileSync(index, html, 'utf-8');
  askToRestart("Custom Pointer has been deactivated, restart to apply changes!");
}

function askToRestart(msg) {
  vscode.window.showInformationMessage(msg, { title: "Restart" })
    .then(() =>
      vscode.commands.executeCommand("workbench.action.reloadWindow")
    );
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

exports.deactivate = deactivate;
