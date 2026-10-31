# Trépate Backend

API de Trépate, la app de movilidad compartida para la comunidad UCE. Es un monolito modular con Node.js, TypeScript, Express, Prisma y Supabase (PostgreSQL).

## Puesta en marcha

Requiere Node.js 24 o superior.

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

El servidor queda en `http://127.0.0.1:3000`.

| Comando | Uso |
|---|---|
| `npm run dev` | Servidor con recarga automática |
| `npm test` | Pruebas |
| `npm run typecheck` | Revisión de tipos |
| `npm run build` | Compilación a `dist/` |
| `npm run db:validate` | Valida `prisma/schema.prisma` |
| `npm run db:migrate` | Crea y aplica migraciones |

## Estructura

```text
prisma/                   Esquema y migraciones
src/
  main.ts                 Arranque y cierre del servidor
  app.ts                  Configuración de Express
  routes.ts               Registro central de módulos
  config/                 Variables de entorno
  shared/                 Código sin reglas de negocio
    database/             Cliente de Prisma
    errors/               Errores de la aplicación
    http/                 Manejo de errores HTTP
  modules/
    onboarding/           Un módulo por dominio
      index.ts            API pública del módulo
      *.routes.ts         Rutas
      *.controller.ts     Traducción HTTP
      *.service.ts        Reglas de negocio
      *.types.ts          Tipos del módulo
      *.test.ts           Pruebas
```

Un módulo nuevo se crea en `src/modules/<nombre>/` y se registra en `src/routes.ts`.

Reglas de los módulos:

- Un módulo solo importa de otro a través de su `index.ts`.
- Las reglas de negocio van en el servicio, no en el controlador.
- `shared/` no depende de ningún módulo.

## API

Las respuestas correctas usan `{ "data": ... }` y los errores `{ "error": { "code", "message" } }`.

| Pantalla | Método | Ruta | Respuesta |
|---|---|---|---|
| Inicio: Comenzar recorrido | `GET` | `/api/v1/onboarding/start` | `{ "data": { "nextStep": "CREATE_ACCOUNT" } }` |
| Salud del servicio | `GET` | `/health` | `{ "data": { "status": "ok" } }` |
