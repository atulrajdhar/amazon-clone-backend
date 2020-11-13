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

describe('Signup user', () => {
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

    it('should be an object with username, password, confirm password and email inputs');
    it('should verify all required inputs are specified');
    it('should validate username');
    it('should validate password');
    it('should check if password and confirm password matches');
    it('should fail when username already exists');
    it('should use bcryptjs to store password');
    it('should signup new user', (done) => {
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