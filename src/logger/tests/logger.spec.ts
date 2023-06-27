import { expect } from 'chai';
import request from 'supertest';
import StatusCodes from 'http-status-codes';

import Db from '../../core/test/config/db';
import UserFactory from '../../core/test/factories/UserFactory';
import app from '../../app';
import IUser from '../../users/domain/models/users/IUser';
import LoggerRepository from '../domain/repositories/logger';

const userFactory = new UserFactory();
const db = new Db();
let user: any;

describe('@Logger', () => {
  before(async () => {
    await db.connect();

    user = <IUser>{
      email: 'user@example.com',
      password: 'Hola.1234',
    };
    await userFactory.create(user);
  });

  after(async () => {
    await db.close();
  });

  it('@log', async () => {
    const ref = 'user.example.biyeco';
    await request(app)
      .post('/api/v1/auth')
      .send({ user })
      .set('X-Request-ID', ref)
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK);

    const loggerRepo = new LoggerRepository();
    const log = await loggerRepo.findOne({ 'config.ref': ref });

    expect(log).to.have.property('type');
    expect(log).to.have.property('config');
    expect(log).to.have.property('state');
    expect(log.type).to.be.equal('loggEntries');
    expect(log.state).not.empty;
    expect(log.config).not.empty;
    expect(log.config).to.have.property('ref');
    expect(log.config.ref).to.be.equal(ref);
    expect(log.state.body).to.have.property('user');
    expect(log.state.body.user).not.empty;
  });
});
