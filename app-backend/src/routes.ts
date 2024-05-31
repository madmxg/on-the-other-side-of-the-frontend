import { Router } from 'express';
import { Gauge } from 'prom-client';

const statusGauge = new Gauge({
  name: 'tjs_app_hits_counter',
  help: 'Number of counter updates',
});

function counter(): Router {
  const router = Router();

  router.get('/increment', (_req, res): void => {
    statusGauge.inc();
    res.status(200).send();
  });

  router.get('/decrement', (_req, res): void => {
    statusGauge.dec();
    res.status(200).send();
  });

  router.get('/reset', (_req, res): void => {
    statusGauge.reset();
    res.status(200).send();
  });

  return router;
}

function probes(): Router {
  const router = Router();

  router.get('/healthz', (_req, res): void => {
    res.status(200).json({ msg: 'ok' });
  });

  router.get('/readiness', (_req, res): void => {
    res.status(200).json({ msg: 'ok' });
  });

  return router;
}

function appRoutes(): Router {
  const router = Router();

  router.get('/', (_req, res): void => {
    res.status(200).json({ hello: 'world' });
  });

  return router;
}

export function routes(): Router {
  const router = Router();

  router.use(probes());
  router.use(appRoutes());
  router.use('/counter', counter());

  return router;
}
