# Trépate Backend
API de movilidad compartida para la comunidad UCE. Monolito modular.

## Stack
Node.js 24 · TypeScript (ESM) · Express 5 · Prisma 6 · Supabase (PostgreSQL)

## Comandos
- Instalar: `npm install`
- Generar cliente: `npm run db:generate`
- Dev: `npm run dev`
- Tests: `npm test`
- Tipos: `npm run typecheck`
- Build: `npm run build`

## Estructura
- `src/modules/<dominio>/`: rutas, controlador, servicio, tipos y pruebas. `index.ts` es su API pública.
- `src/shared/`: base de datos, errores y HTTP, sin reglas de negocio.
- `src/routes.ts`: registro central de módulos.
- `prisma/schema.prisma`: los modelos se agregan cuando una pantalla los necesita.

## Reglas del proyecto
- Solo backend. El alcance actual son las 3 primeras pantallas del Figma.
- Push solo con confirmación explícita del usuario.
- Comentarios cortos en español en las funciones principales.
- Prisma fijo en 6.19.3. `latest` apunta a una versión candidata de la 8.
- Usar `prisma migrate`, no `db push`: los `CHECK` manuales solo viven en las migraciones.
