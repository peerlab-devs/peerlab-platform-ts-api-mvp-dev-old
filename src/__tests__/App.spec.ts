import request from 'supertest';

import { Connection, getConnection, getRepository } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/app';

let connection: Connection;

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new user', async () => {
    const name = 'User';
    const surname = 'One';
    const email = 'user1@email.com';
    const password = '123456';

    const response = await request(app).post('/users').send({
      name,
      surname,
      email,
      password,
    });

    const { user } = response.body;

    /**
     * Partial matching test
     * Ref: https://codewithhugo.com/jest-array-object-match-contain/
     */
    expect(user).toEqual(
      expect.objectContaining({
        name,
        surname,
        email,
      }),
    );
  });

  it('should not expose the password_hash while creating a new user', async () => {
    const name = 'User';
    const surname = 'One';
    const email = 'user1@email.com';
    const password = '123456';

    const response = await request(app).post('/users').send({
      name,
      surname,
      email,
      password,
    });

    const { user } = response.body;

    /**
     * Partial matching test
     * Ref: https://codewithhugo.com/jest-array-object-match-contain/
     */
    expect(user.password_hash).toEqual(undefined);
  });

  // it('should not be able to create a user with one e-mail thats already registered', async () => {
  //   const user = await request(app).post('/users').send({
  //     name: 'User',
  //     surname: 'One',
  //     email: 'user1@email.com',
  //     password: '123456',
  //   });

  //   expect(user.body).toEqual(
  //     expect.objectContaining({
  //       name: 'User',
  //       surname: 'One',
  //       email: 'user1@email.com',
  //     }),
  //   );

  //   const response = await request(app).post('/users').send({
  //     name: 'User',
  //     surname: 'One',
  //     email: 'user1@email.com',
  //     password: '123456',
  //   });

  //   expect(response.status).toBe(400);
  // });

  // it('should be able to create a new product', async () => {
  //   const response = await request(app).post('/products').send({
  //     name: 'Produto 01',
  //     price: 500,
  //     quantity: 50,
  //   });

  //   expect(response.body).toEqual(
  //     expect.objectContaining({
  //       name: 'Produto 01',
  //       price: 500,
  //       quantity: 50,
  //     }),
  //   );
  // });

  // it('should not be able to create a duplicated product', async () => {
  //   const product = await request(app).post('/products').send({
  //     name: 'Produto 01',
  //     price: 500,
  //     quantity: 50,
  //   });

  //   expect(product.body).toEqual(
  //     expect.objectContaining({
  //       name: 'Produto 01',
  //       price: 500,
  //       quantity: 50,
  //     }),
  //   );

  //   const response = await request(app).post('/products').send({
  //     name: 'Produto 01',
  //     price: 500,
  //     quantity: 50,
  //   });

  //   expect(response.status).toBe(400);
  // });

  // it('should be able to create a new order', async () => {
  //   const product = await request(app).post('/products').send({
  //     name: 'Produto 01',
  //     price: 500,
  //     quantity: 50,
  //   });

  //   const user = await request(app).post('/users').send({
  //     name: 'Rocketseat',
  //     email: 'oi@rocketseat.com.br',
  //   });

  //   const response = await request(app)
  //     .post('/orders')
  //     .send({
  //       user_id: user.body.id,
  //       products: [
  //         {
  //           id: product.body.id,
  //           quantity: 5,
  //         },
  //       ],
  //     });

  //   expect(response.body).toEqual(
  //     expect.objectContaining({
  //       user: expect.objectContaining({
  //         id: user.body.id,
  //         name: 'Rocketseat',
  //         email: 'oi@rocketseat.com.br',
  //       }),
  //       order_products: expect.arrayContaining([
  //         expect.objectContaining({
  //           product_id: product.body.id,
  //           price: '500.00',
  //           quantity: 5,
  //         }),
  //       ]),
  //     }),
  //   );
  // });

  // it('should not be able to create an order with a invalid user', async () => {
  //   const response = await request(app).post('/orders').send({
  //     user_id: '6a1922c8-af6e-470e-9a34-621cb0643911',
  //   });

  //   expect(response.status).toEqual(400);
  // });

  // it('should not be able to create an order with invalid products', async () => {
  //   const user = await request(app).post('/users').send({
  //     name: 'Rocketseat',
  //     email: 'oi@rocketseat.com.br',
  //   });

  //   const response = await request(app)
  //     .post('/orders')
  //     .send({
  //       user_id: user.body.id,
  //       products: [
  //         {
  //           id: '6a1922c8-af6e-470e-9a34-621cb0643911',
  //         },
  //       ],
  //     });

  //   expect(response.status).toEqual(400);
  // });

  // it('should not be able to create an order with products with insufficient quantities', async () => {
  //   const user = await request(app).post('/users').send({
  //     name: 'Rocketseat',
  //     email: 'oi@rocketseat.com.br',
  //   });

  //   const product = await request(app).post('/products').send({
  //     name: 'Produto 01',
  //     price: 500,
  //     quantity: 50,
  //   });

  //   const response = await request(app)
  //     .post('/orders')
  //     .send({
  //       user_id: user.body.id,
  //       products: [
  //         {
  //           id: product.body.id,
  //           quantity: 500,
  //         },
  //       ],
  //     });

  //   expect(response.status).toEqual(400);
  // });

  // it('should be able to subtract an product total quantity when it is ordered', async () => {
  //   const productsRepository = getRepository(Product);

  //   const user = await request(app).post('/users').send({
  //     name: 'Rocketseat',
  //     email: 'oi@rocketseat.com.br',
  //   });

  //   const product = await request(app).post('/products').send({
  //     name: 'Produto 01',
  //     price: 500,
  //     quantity: 50,
  //   });

  //   await request(app)
  //     .post('/orders')
  //     .send({
  //       user_id: user.body.id,
  //       products: [
  //         {
  //           id: product.body.id,
  //           quantity: 5,
  //         },
  //       ],
  //     });

  //   let foundProduct = await productsRepository.findOne(product.body.id);

  //   expect(foundProduct).toEqual(
  //     expect.objectContaining({
  //       quantity: 45,
  //     }),
  //   );

  //   await request(app)
  //     .post('/orders')
  //     .send({
  //       user_id: user.body.id,
  //       products: [
  //         {
  //           id: product.body.id,
  //           quantity: 5,
  //         },
  //       ],
  //     });

  //   foundProduct = await productsRepository.findOne(product.body.id);

  //   expect(foundProduct).toEqual(
  //     expect.objectContaining({
  //       quantity: 40,
  //     }),
  //   );
  // });

  // it('should be able to list one specific order', async () => {
  //   const user = await request(app).post('/users').send({
  //     name: 'Rocketseat',
  //     email: 'oi@rocketseat.com.br',
  //   });

  //   const product = await request(app).post('/products').send({
  //     name: 'Produto 01',
  //     price: 500,
  //     quantity: 50,
  //   });

  //   const order = await request(app)
  //     .post('/orders')
  //     .send({
  //       user_id: user.body.id,
  //       products: [
  //         {
  //           id: product.body.id,
  //           quantity: 5,
  //         },
  //       ],
  //     });

  //   const response = await request(app).get(`/orders/${order.body.id}`);

  //   expect(response.body).toEqual(
  //     expect.objectContaining({
  //       user: expect.objectContaining({
  //         id: user.body.id,
  //         name: 'Rocketseat',
  //         email: 'oi@rocketseat.com.br',
  //       }),
  //       order_products: expect.arrayContaining([
  //         expect.objectContaining({
  //           product_id: product.body.id,
  //           price: '500.00',
  //           quantity: 5,
  //         }),
  //       ]),
  //     }),
  //   );
  // });
});
