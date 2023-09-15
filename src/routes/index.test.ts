/* eslint-disable @typescript-eslint/naming-convention */
import request from 'supertest';
import app from '../app';

interface ResponseBody {
  headers: {
    'content-type': string;
  };
  status: number;
  text: string;
}

interface GenericResponseBody {
  [key: string]: unknown;
}

describe('Test the root path', () => {
  test('It should respond to the GET method with Hello, World!', async () => {
    const response: ResponseBody = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain(
      'text/html; charset=utf-8'
    );

    const data: GenericResponseBody = <GenericResponseBody>(
      JSON.parse(response.text)
    );

    expect(data).toEqual({ message: 'Hello, World!' });
  });
});

describe('Test the /register path', () => {
  test('It should respond to the POST method with User is Created', async () => {
    const response: ResponseBody = await request(app).post('/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com'
    });
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toContain('application/json');

    const data: GenericResponseBody = <GenericResponseBody>(
      JSON.parse(response.text)
    );

    expect(data).toEqual({ message: 'User is Created' });
  });

  test('It should respond to the POST method with 400 status code if firstName is not passed', async () => {
    const response: ResponseBody = await request(app).post('/register').send({
      lastName: 'Doe',
      email: 'johndoe@example.com'
    });
    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toContain('application/json');

    const data: GenericResponseBody = <GenericResponseBody>(
      JSON.parse(response.text)
    );

    expect(data).toEqual({ message: 'You need to pass first name' });
  });
});

describe('Test the /test path', () => {
  test('It should respond to the GET method with Hello from test page!', async () => {
    const response: ResponseBody = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');

    // Note: return sring, not json
    expect(response.text).toEqual('<h3>Hello from test page!</h3>');
  });
});

describe('Test the /api path', () => {
  test('It should respond to the GET method with Hello from test api!', async () => {
    const response: ResponseBody = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');

    const data: GenericResponseBody = <GenericResponseBody>(
      JSON.parse(response.text)
    );

    expect(data).toEqual({ message: 'Hello from test api!' });
  });
});
