import { Router } from 'express';
import opentelemetry from '@opentelemetry/api';
import { Gauge } from 'prom-client';

const hitsGauge = new Gauge({
  name: 'tjs_app_hits_counter',
  help: 'Number of counter updates',
});

function counter(): Router {
  const router = Router();

  router.get('/increment', (_req, res): void => {
    hitsGauge.inc();
    res.status(200).send();
  });

  router.get('/decrement', (_req, res): void => {
    hitsGauge.dec();
    res.status(200).send();
  });

  router.get('/reset', (_req, res): void => {
    hitsGauge.reset();
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
    const tracer = opentelemetry.trace.getTracer('hello-tracer');
    const span = tracer.startSpan('hello');
    span.setAttribute('value', 'world');
    span.end();
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
