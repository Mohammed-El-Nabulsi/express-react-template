import 'source-map-support/register';

import express from 'express';
import graceful from 'node-graceful';
import path from 'path';
import readline from 'readline';

import timeoutAsync from './asyncTools/timeoutAsync';
import listenAsync from './extensions/expressExtensions';

/**
 * Enable graceful shutdown using SIGINT on Windows.
 * Credits to http://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
 */
if (process.platform === 'win32') {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.on('SIGINT', () => {
		process.emit('SIGINT');
	});
}

graceful.on('exit', (done) => {
	stopApplication().then(done);
});

const app = express();

/**
 * stopApplication - Gracefully shuts down running services.
 */
async function stopApplication() {
	console.log('Termination requested');

	// Stop running services here....
	app._terminationComplete = true;

	while (app._running) {
		await timeoutAsync(250);
	}
}

async function main() {
	console.log('Program started successfully.');

	app.use('/build', express.static(path.join(__dirname, '../frontend')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/index.html'));
	});

	await listenAsync.call(app, 3000);

	app._running = false;
}

main()
  .then(() => {
	console.log('Program terminated successfully.');
	process.exit(0);
  })
  .catch((err) => {
	console.error('Program terminated with an error.');
	console.error(err.stack);
	process.exit(1);
  });
