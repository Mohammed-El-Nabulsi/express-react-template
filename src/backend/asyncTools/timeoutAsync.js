export default function timeoutAsync(timeout) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, timeout);
	});
}
