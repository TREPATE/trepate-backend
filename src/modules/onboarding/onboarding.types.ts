// Pantallas a las que la app puede enviar al usuario desde el inicio.
export const NextStep = {
  CREATE_ACCOUNT: 'CREATE_ACCOUNT',
} as const;

export type NextStep = (typeof NextStep)[keyof typeof NextStep];

export interface StartJourneyResult {
  nextStep: NextStep;
}
