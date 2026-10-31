import express, { type Express } from 'express';
import { apiRouter } from './routes.js';
import { errorHandler, notFoundHandler } from './shared/http/error-handler.js';

// Arma la aplicación sin abrir el puerto, para poder probarla de forma aislada.
export function createApp(): Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({ data: { status: 'ok' } });
  });
  app.use('/api/v1', apiRouter);

  // Los manejadores de error van siempre al final.
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
