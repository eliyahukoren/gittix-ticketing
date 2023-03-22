import request from 'supertest';
import { app } from '../../app';

const createTicket = async (title: string) => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price: 20,
    });
}

it('cat fetch a list of tickets', async () => {
  createTicket('ticket 1');
  createTicket("ticket 2");
  createTicket("ticket 3");

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)

  expect(response.body.length).toEqual(3);
})
