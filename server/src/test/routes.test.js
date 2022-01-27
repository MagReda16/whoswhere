// import express from 'express';
// import {expect} from 'chai';
// import supertest from 'supertest';
// import jwt from 'jsonwebtoken';
// // import mongoose from '../db';
// import router from '../router';
const express = require('express');
const expect = require('chai').expect;
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const router = require('../router');

const app = express();
app.use(express.json());
app.use(router);

const request = supertest(app);

const testUser = {
  firstName: 'Test',
  lastName: 'User',
  username: 'testuser',
  password: 'testpass',
  role: 'tester',
  team: 'testers',
  admin: false,
};

describe('test server endpoints', () => {

  describe('POST /register', () => {
    it('should create a new user', async () => {
      const res = await request.post('/register')
        .send(testUser);
      expect(res.status).to.equal(201);
    })
  })

})
