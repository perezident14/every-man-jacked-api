import pino from 'pino';
import pretty from 'pino-pretty';

const logger = pino(pretty({ translateTime: 'SYS:longTime' }));

export default logger;
