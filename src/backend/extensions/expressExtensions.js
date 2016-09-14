import assert from 'assert';
import timeoutAsync from '../asyncTools/timeoutAsync';

/**
 * listenAsync - Extension on top of express to start a server asynchronously.
 *
 * @param  {type} port Port for express to run on.
 */
export default async function listenAsync(port) {
	assert(this.constructor.name === 'EventEmitter',
	'listenAsync has to be called on an express instance.');

	this._running = true;
	this._terminationComplete = false;

	const server = this.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});

	return new Promise( async (res, rej) => {
		while (!this._terminationComplete) {
			await timeoutAsync(250);
		}
		server.close();
		res();
	});
}
