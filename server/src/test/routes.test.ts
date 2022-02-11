import express from 'express';
import { expect } from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Team from '../models/team.model';
import router from '../router';
import 'mocha';
import { testUser, testUser2 } from './mocks';

const app = express();
app.use(express.json());
app.use(router);

const request = supertest(app);

describe('test server endpoints', () => {

  before('remove users from database', async () => {
    await User.deleteMany();
    await Team.deleteMany();
  })

  describe('POST /register', () => {
    it('should create a new user', async () => {
      const res = await request.post('/register')
        .send(testUser);
      expect(res.status).to.equal(201);
      expect(res.body.username).to.equal(testUser.username);
    });

    it('should not register user with the same username', async () => {
      const res = await request.post('/register')
        .send(testUser);
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('Username already exists');
    });
  });

  describe('POST /login', () => {
    it('should login user and return accesstoken', async () => {
      await request.post('/register').send(testUser);
      const res = await request.post('/login').send({ username: testUser.username, password: testUser.password });
      expect(res.status).to.equal(200);
      expect(res.body).to.haveOwnProperty('accessToken');
    });

    it('should return 403 if login or password is incorrect', async () => {
      await request.post('/register').send(testUser);
      const res = await request.post('/login').send({ username: 'wrongUser', password: testUser.password });
      expect(res.status).to.equal(403);
      expect(res.body.message).to.equal('Email or password is incorrect');
    });
  });

  describe('test authentication middleware', () => {
    it('should return 403 if accessToken is not provided', async () => {
      await request.post('/register').send(testUser);
      const res = await request.get('/profile');
      expect(res.status).to.equal(403);
      expect(res.body.message).to.equal('Unauthorized request');
    });

    it('should return 403 if accessToken is wrong', async () => {
      const user = await request.post('/register').send(testUser2);
      const token = jwt.sign({ userId: user.body._id }, 'wrong secret');
      const res = await request.get('/profile').set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(403);
      expect(res.body.message).to.equal('Unauthorized request');
    });

    it('should return 403 if accessToken is provided but user doesn\'t exist', async () => {
      // const user = await request.post('/register').send(testUser2);
      const token = jwt.sign({ userId: 1 }, 'this is for test purposes');
      const res = await request.get('/profile').set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(403);
      expect(res.body.message).to.equal('Unauthorized request');
    })
  });

  describe('GET /profile', () => {
    it('should return user profile', async () => {
      const { username, password } = testUser2;
      const user = await request.post('/register').send(testUser2);
      const token = await request.post('/login').send({ username, password });
      const res = await request.get('/profile').set('Authorization', `Bearer ${token.body.accessToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.username).to.equal(testUser2.username);
    });
  });

  describe('PUT /profile/location', () => {
    it('should update the location of the user', async () => {
      const { username, password } = testUser2;
      const user = await request.post('/register').send(testUser2);
      const token = await request.post('/login').send({ username, password });
      expect(user.body.location).to.equal(undefined);
      const res = await request.put('/profile/location').set('Authorization', `Bearer ${token.body.accessToken}`).send({location: 'San Jose, CA'});
      expect(res.status).to.equal(200);
      expect(res.body.location).to.equal('San Jose, CA');
    });
  });

  describe('GET /team', () => {
    it('should retrieve team information', async () => {
      const { username, password } = testUser2;
      const user = await request.post('/register').send(testUser2);
      const token = await request.post('/login').send({ username, password });
      const res = await request.get('/team').set('Authorization', `Bearer ${token.body.accessToken}`)
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('testers');
      expect(res.body.tasks).to.eql([]);
    });
  });

  describe('POST /team/task', () => {
    it('should add task to team', async () => {
      const { username, password } = testUser2;
      const user = await request.post('/register').send(testUser2);
      const token = await request.post('/login').send({ username, password });
      const team = await request.get('/team').set('Authorization', `Bearer ${token.body.accessToken}`);
      expect(team.body.tasks.length).to.equal(0);
      const task = await request.post('/team/task').set('Authorization', `Bearer ${token.body.accessToken}`).send({task: 'Test Task'});
      expect(task.status).to.equal(201);
      const teamUpdated = await request.get('/team').set('Authorization', `Bearer ${token.body.accessToken}`);
      expect(teamUpdated.body.tasks.length).to.equal(1);
    });
  });

})
