import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error.js';

// Responde 404 con el mismo formato de error que el resto de la API.
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(404, 'NOT_FOUND', `Ruta no encontrada: ${req.method} ${req.path}`));
}

function getClientErrorStatus(err: unknown): number | undefined {
  if (typeof err !== 'object' || err === null || !('status' in err)) return undefined;

  const { status } = err;
  return typeof status === 'number' && status >= 400 && status < 500 ? status : undefined;
}

// Punto único de salida de errores. Los inesperados no exponen detalles al cliente.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // Express identifica este middleware porque declara cuatro parámetros.
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: { code: err.code, message: err.message } });
    return;
  }

  // Errores del cliente detectados por Express, como un JSON mal formado.
  const status = getClientErrorStatus(err);
  if (status !== undefined) {
    res.status(status).json({ error: { code: 'BAD_REQUEST', message: 'Petición inválida' } });
    return;
  }

  console.error(err);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor' } });
}
