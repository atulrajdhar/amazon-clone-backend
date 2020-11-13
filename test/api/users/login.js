process.env.NODE_ENV = 'test';

import dotenv from 'dotenv';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import mongoose from 'mongoose';
import { MongoMemoryServer} from 'mongodb-memory-server';

import users from '../../../controllers/users';
import User from '../../../models/user';
import app from '../../../app';

dotenv.config();

chai.should();
chai.use(chaiHttp);

let mongoServer;

describe('Login user', () => {
    before( async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    });

    after( async () => {
        await mongoose.disconnect();
        await mongoServer.stop();                  
    });

    it('should be an object with username and password inputs');
    it('should verify both inputs are specified');
    it('should validate username');
    it('should validate password');
    it('should fail when username does not exists');
    it('should fail when password does match');
    it('should use bcryptjs to compare passwords');
    it('should login user and return a JWT token with _id, username and email fields', (done) => {
       const user = new User({
               username: 'abc',
               password: 'abc',
               email: 'abc@xyz.com'
           });
        chai.request(app)
            .post('/signup')
            .send(user)                
            .end((err, res) => {
                const body = res.body;
                res.should.have.status(201);
                body.should.be.a('object');
                body.should.have.property('_id');                
                body.should.have.property('username').eq(user.username);
                body.should.have.property('email').eq(user.email);
                done();
            });        
    });    
});