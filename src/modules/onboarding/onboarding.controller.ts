import type { Request, Response } from 'express';
import { startJourney } from './onboarding.service.js';

// Traduce el resultado del servicio a la respuesta HTTP.
export function startJourneyHandler(_req: Request, res: Response): void {
  res.status(200).json({ data: startJourney() });
}
