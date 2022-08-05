const vscode = require( 'vscode' )
const fs = require( 'fs' )
const {
	WORKBENCH_MAIN_CSS_FILE
} = require( './constants' )

function askToRestart( msg ) {
	vscode.window.showInformationMessage( msg, { title: "Restart" } ).then( () =>
		vscode.commands.executeCommand( "workbench.action.reloadWindow" )
	)
}

function getActiveVersion() {
	var html = fs.readFileSync( WORKBENCH_MAIN_CSS_FILE, 'utf-8' )
	const match = html.match( /\/\*CUSTOM-POINTER_BEGIN \[(.*?)\]\*\// )
	return match ? match[1] : null
}

function getExtensionVersion() {
	return vscode.extensions.getExtension( 'diegocurbelo.custom-pointer' ).packageJSON.version
}

module.exports = {
	askToRestart,
	getActiveVersion,
	getExtensionVersion,
}
