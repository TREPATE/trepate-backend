const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 3000;

// Valida el puerto al arrancar para fallar pronto si la configuración es inválida.
function parsePort(value: string | undefined): number {
  if (value === undefined || value === '') return DEFAULT_PORT;

  const port = Number(value);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`PORT inválido: ${value}`);
  }
  return port;
}

export const env = {
  host: process.env.HOST || DEFAULT_HOST,
  port: parsePort(process.env.PORT),
};
