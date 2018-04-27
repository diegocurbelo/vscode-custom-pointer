const vscode = require('vscode')
const path = require('path')
const fs = require('fs');
const commands = require('./commands')

// If and exception is thrown, ask for Visual Studio Core to be run with admin privileges
process.on ('uncaughtException', err => {
  if (!/ENOENT|EACCES|EPERM/.test(err.code)) {
    console.log('[Custom Pointer] >', 'uncaughtException')
    return
  }
  vscode.window.showInformationMessage('Run Visual Studio Code with admin privileges so the changes can be applied')
});

// this method is called when your extension is activated
function activate(context) {
  if (!isPatched()) {
    commands.enable()
  }
  context.subscriptions.push(
    vscode.commands.registerCommand('customPointer.enable', function() { commands.enable() })
  )
  context.subscriptions.push(
    vscode.commands.registerCommand('customPointer.disable', function() { commands.disable() })
  )
}

// this method is called when your extension is deactivated
function deactivate() {
}

exports.activate = activate;
exports.deactivate = deactivate;

// --

function isPatched() {
  const baseDir = path.dirname(require.main.filename)
  const indexFile  = path.join(baseDir, 'vs', 'workbench', 'electron-browser', 'bootstrap', 'index.html')
  var html = fs.readFileSync(indexFile, 'utf-8')
  return /<!-- CUSTOM-POINTER_BEGIN -->/.test(html)
}
