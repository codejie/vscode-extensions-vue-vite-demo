// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from 'path';
import * as vscode from 'vscode';
import { getUri } from './getUri';
import { getNonce } from './getNonce';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "my-ext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('my-ext.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from my-ext!');
	});

	context.subscriptions.push(disposable);

	const disposable1 = vscode.commands.registerCommand('my-ext.showPanel', () => {
		const panel = vscode.window.createWebviewPanel(
			'myPanel',
			'panel title',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'dist', 'webview')]
			}
		)
		const scriptPath = getUri(panel.webview, context.extensionUri, ['dist', 'webview', 'main.js'])
		panel.webview.html = getHtmlContent(context, panel.webview)
		//  getWebviewContent(scriptPath)
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from my-ext!');
	});

	context.subscriptions.push(disposable1);
}

function getWebviewContent(scriptSrc: vscode.Uri): string {
  // return `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <title>My Vue Panel</title>
  //   </head>
  //   <body>
  //     <div id="app"></div>
  //     <script src="${scriptSrc}"></script>
	// 		<H1>hello{{scriptSrc}}</H1>
  //   </body>
  //   </html>
  // `
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Vite + Vue + TS</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module" src="${scriptSrc}"></script>
			</body>
		</html>
	`
}

function getHtmlContent(context: vscode.ExtensionContext, webview: vscode.Webview): string {
	// Get the local path to main script run in the webview,
	// then convert it to a uri we can use in the webview.

	// The CSS file from the React build output
	const stylesUri = getUri(webview, context.extensionUri, ["dist", "webview", "main.css"])
	// The JS file from the React build output
	const scriptUri = getUri(webview, context.extensionUri, ["dist", "webview", "main.js"])

	const codiconsUri = getUri(webview, context.extensionUri, [
		"node_modules",
		"@vscode",
		"codicons",
		"dist",
		"codicon.css",
	])

	// const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "main.js"))

	// const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "reset.css"))
	// const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "vscode.css"))


	const nonce = getNonce()

	// Tip: Install the es6-string-html VS Code extension to enable code highlighting below
	return /*html*/ `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
					<meta name="theme-color" content="#000000">
					<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; img-src ${webview.cspSource} https: data:; script-src 'nonce-${nonce}';">
					<link rel="stylesheet" type="text/css" href="${stylesUri}">
		<link href="${codiconsUri}" rel="stylesheet" />
				</head>
				<body>
					<div id="app"></div>
					<script nonce="${nonce}" type="module" src="${scriptUri}"></script>					
				</body>
			</html>
		`
}


// This method is called when your extension is deactivated
export function deactivate() {}
