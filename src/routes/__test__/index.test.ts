import request from 'supertest';
import { app } from '../../app';

const createTicket = async (title: string, cookie: string[]) => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title,
      price: 20,
    });
}

it('can fetch a list of tickets', async () => {
  const cookie = global.signin();

  await createTicket('ticket 1', cookie);
  await createTicket("ticket 2", cookie);
  await createTicket("ticket 3", cookie);

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)

  expect(response.body.length).toEqual(3);
})
