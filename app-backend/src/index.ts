import express from 'express';
import promBundle from 'express-prom-bundle';
import { collectDefaultMetrics } from 'prom-client';

import './instrumentation';
import { config } from './config';
import { logger } from './logger';
import { routes } from './routes';

const app = express();
const metricsMiddleware = promBundle({ includeMethod: true });
collectDefaultMetrics();

app.use(metricsMiddleware);
app.use(routes());

app.get('/', (_req, res) => {
  res.send('Hello, World1!');
});

app.listen(config.server.port, () => {
  logger.info(`Server is running on port ${config.server.port}`);
});
