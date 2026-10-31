import assert from 'node:assert/strict';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { after, before, describe, it } from 'node:test';
import { createApp } from '../../app.js';

describe('GET /api/v1/onboarding/start', () => {
  let server: Server;
  let baseUrl: string;

  before(async () => {
    await new Promise<void>((resolve) => {
      server = createApp().listen(0, '127.0.0.1', () => resolve());
    });
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  it('envía a crear cuenta a un usuario sin sesión', async () => {
    const response = await fetch(`${baseUrl}/api/v1/onboarding/start`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { data: { nextStep: 'CREATE_ACCOUNT' } });
  });

  it('rechaza un método no definido con el formato de error de la API', async () => {
    const response = await fetch(`${baseUrl}/api/v1/onboarding/start`, { method: 'POST' });

    assert.equal(response.status, 404);
    const body = (await response.json()) as { error: { code: string } };
    assert.equal(body.error.code, 'NOT_FOUND');
  });

  it('responde 400 ante un JSON mal formado', async () => {
    const response = await fetch(`${baseUrl}/api/v1/onboarding/start`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{mal',
    });

    assert.equal(response.status, 400);
    const body = (await response.json()) as { error: { code: string } };
    assert.equal(body.error.code, 'BAD_REQUEST');
  });
});
