import winston from 'winston';

import { config } from './config';

const { levels, colors } = winston.config.npm;

winston.addColors(colors);

export const logger = winston.createLogger({
  levels,
  level: config.server.logLevel,
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: { service: 'app-backend' },
  transports: [new winston.transports.Console()],
});
