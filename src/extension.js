const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const commands = require('./commands')

// If and exception is thrown, ask for Visual Studio Core to be run with admin privileges
process.on('uncaughtException', err => {
  if (!/ENOENT|EACCES|EPERM/.test(err.code)) {
    console.log('[Custom Pointer] >', 'uncaughtException')
    return
  }
  vscode.window.showInformationMessage('Run Visual Studio Code with admin privileges so the changes can be applied')
})

// this method is called when your extension is activated
function activate(context) {
  // Register ENABLE and DISABLE commmands
  context.subscriptions.push(
    vscode.commands.registerCommand('customPointer.enable', function() { commands.enable() })
  )
  context.subscriptions.push(
    vscode.commands.registerCommand('customPointer.disable', function() { commands.disable() })
  )
  context.subscriptions.push(
    vscode.commands.registerCommand('customPointer.remove', function() { commands.remove() })
  )

  const version = readInstalledVersion()

  if (version) {
    if (version !== 'disabled' && version !== getVersion()) {
      commands.update()
    }

  } else {
    commands.enable()
  }
}

// this method is called when your extension is deactivated
function deactivate() {
}

exports.activate = activate;
exports.deactivate = deactivate;

// --

function readInstalledVersion() {
  const baseDir = path.dirname(require.main.filename)
  const indexFile  = path.join(baseDir, 'vs', 'code', 'electron-browser', 'workbench', 'workbench.html')
  var html = fs.readFileSync(indexFile, 'utf-8')

  const match = html.match(/<!-- CUSTOM-POINTER_BEGIN \[(.*?)\] -->/)
  return match ? match[1] : null
}

function getVersion() {
  return vscode.extensions.getExtension('diegocurbelo.custom-pointer').packageJSON.version
}
