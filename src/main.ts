import { createApp } from './app.js';
import { env } from './config/env.js';
import { prisma } from './shared/database/prisma.js';

const server = createApp().listen(env.port, env.host, () => {
  console.log(`Trépate API en http://${env.host}:${env.port}`);
});

// Cierre ordenado: termina las peticiones en curso y libera la conexión a la base.
function shutdown(): void {
  server.close(() => {
    void prisma.$disconnect().finally(() => process.exit(0));
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
