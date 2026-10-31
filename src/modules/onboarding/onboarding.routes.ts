import { Router } from 'express';
import { startJourneyHandler } from './onboarding.controller.js';

export const onboardingRouter = Router();

// Botón "Comenzar recorrido" de la pantalla de inicio. No modifica datos.
onboardingRouter.get('/start', startJourneyHandler);
