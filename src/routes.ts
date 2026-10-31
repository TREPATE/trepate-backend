import { Router } from 'express';
import { onboardingRouter } from './modules/onboarding/index.js';

// Registro central: cada módulo nuevo se monta aquí con su prefijo.
export const apiRouter = Router();

apiRouter.use('/onboarding', onboardingRouter);
