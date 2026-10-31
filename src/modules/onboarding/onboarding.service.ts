import { NextStep, type StartJourneyResult } from './onboarding.types.js';

// Decide el destino de "Comenzar recorrido". Sin sesión, el usuario va a crear su cuenta.
export function startJourney(): StartJourneyResult {
  return { nextStep: NextStep.CREATE_ACCOUNT };
}
