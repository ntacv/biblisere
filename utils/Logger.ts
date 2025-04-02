/* tslint:disable */
declare type LogLevel = 'debug' | 'info' | 'warn' | 'error';

let logLevel: LogLevel = 'info';
let disabled = false;

const iflevel = (level: LogLevel) => {
	if (logLevel === 'debug' || (level === 'warn' && logLevel !== 'error')) {
		return true;
	}
	if (logLevel === level) {
		return true;
	}
	return false;
};

const log = (method: (args: any) => void, args: any) => {
	if (disabled) {
		return;
	}
	if (!method) {
		method = console.log;
	}
	method.apply(console, args);
};

const Logger = {
	debug: (...args: any[]) => {
		if (iflevel('debug')) {
			log(console.log, args);
		}
	},
	info: (...args: any[]) => {
		if (iflevel('info')) {
			log(console.info, args);
		}
	},
	warn: (...args: any[]) => {
		if (iflevel('warn')) {
			log(console.warn, args);
		}
	},
	error: (...args: any[]) => {
		log(console.error, args);
	},
	setLogLevel: (level: LogLevel) => (logLevel = level),
	disableAll: () => {
		// Pour les tests : en cas de console.error, le test fail.
		// La, on supprime toutes les logs.
		// Comme c'est pour les tests, pas de raison d'avoir besoin de les reactiver.
		disabled = true;
	},
};

export { disabled, iflevel, log, logLevel };
export default Logger;
