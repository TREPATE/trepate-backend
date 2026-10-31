import { PrismaClient } from '@prisma/client';

// Cliente único de la base de datos. Se conecta a Supabase en la primera consulta.
export const prisma = new PrismaClient();
