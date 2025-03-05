/* eslint-disable no-console */
export const logger = (filename: string) => {
	const log = (message: string, level: 'log' | 'warn' | 'error') => {
		const stack = new Error().stack;
		const functionName = stack ? stack.split('\n')[3].trim().split(' ')[1] : 'unknown';
		console[level](`[${new Date().toLocaleString()}] [${filename}] [${functionName}] ${message}`);
	};
	return {
		info: (message: string) => log(message, 'log'),
		warn: (message: string) => log(message, 'warn'),
		error: (message: string) => log(message, 'error'),
	};
};
