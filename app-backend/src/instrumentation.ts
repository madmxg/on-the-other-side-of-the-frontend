import { Resource } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';

const provider = new NodeTracerProvider({
  resource: new Resource({ [SEMRESATTRS_SERVICE_NAME]: 'backend-app' }),
});

const exporter = new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' });
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();
