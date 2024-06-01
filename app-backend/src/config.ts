if (typeof process.env['SERVER_PORT'] !== 'string') {
  throw new Error('ENV SERVER_PORT is required');
}
if (typeof process.env['LOG_LEVEL'] !== 'string') {
  throw new Error('ENV LOG_LEVEL is required');
}

export const config = {
  server: {
    port: Number.parseInt(process.env['SERVER_PORT'], 10),
    logLevel: process.env['LOG_LEVEL'],
  },
};
