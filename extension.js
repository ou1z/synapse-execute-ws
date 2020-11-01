const { visitEachChild } = require('typescript');
const vscode = require('vscode');
const ws = require('ws')


const server = new ws.Server({ port: 28561 });
let wsclient
let name


server.on('connection', client => {
	wsclient = client
	client.on('message', message => {
		message = message.toString()
		if(message.includes('compile_err:')) {
			vscode.window.showErrorMessage(message.replace('compile_err:', ''))
		}
		else if(message.includes('auth:')) {
			name = message.replace('auth:','')
			vscode.window.showInformationMessage('Client Connected: '+name)
		}
	})
	client.on('close', () => {
		vscode.window.showInformationMessage('Client disconnected: '+name)
	})
})


/**
 * @param {vscode.ExtensionContext} context
 */

let execute = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
execute.command = 'synapse-execute-ws.ExecuteSynapseScript'
execute.tooltip = "Execute's the current file's script."
execute.text = 'Execute Synapse Script'



function activate(context) {

	execute.show()

	let disposable = vscode.commands.registerCommand('synapse-execute-ws.ExecuteSynapseScript', function () {
		const editor = vscode.window.activeTextEditor;

        if (editor) {
            let document = editor.document;
            const documentText = document.getText();
			wsclient.send(documentText)
            vscode.window.showInformationMessage('Executed!');
        }
	});

	context.subscriptions.push(disposable);
}




exports.activate = activate;
function deactivate() {
	execute.dispose()
}
module.exports = {
	activate,
	deactivate
}
