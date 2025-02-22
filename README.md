# vscode-extensions-vue-vite-demo
how to use vue+vite to make a vscode extension

# Getting started guide
## Step 1: create vscode extensions project
```shell
npm install -g yo
npm install -g generator-code

yo code
```
## Step 2: create vue project
```shell
npm init vite
```

## Step 3：
- merge vue progject to vscode extensions project as a sub-folder, for example, src/webview;
- build vue project, and import scripts into vscode extensons project;
```typescript
		const scriptPath = getUri(panel.webview, context.extensionUri, ['dist', 'webview', 'main.js'])
		panel.webview.html = getHtmlContent(context, panel.webview)
```
- build vscode extensions project.

# Conclusion
Maybe it is not a good idea that make vscode extensions with vue.
