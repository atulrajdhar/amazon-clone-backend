process.env.NODE_ENV = 'test';

import dotenv from 'dotenv';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import mongoose from 'mongoose';
import { MongoMemoryServer} from 'mongodb-memory-server';

import users from '../../../../controllers/admin/users';
import User from '../../../../models/user';
import app from '../../../../app';



dotenv.config();

chai.should();
chai.use(chaiHttp);

let mongoServer;

describe('POST /users', () => {
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


    it('should verify admin');
    it('should create a new user', (done) => {
        const user = new User({
                username: 'abc',
                password: 'abc',
                email: 'abc@xyz.com'
            });
        chai.request(app).post('/users')
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

    it('should get user with given user._id', (done) => {
        const user = new User({
                username: 'abc2',
                password: 'abc',
                email: 'abc@xyz.com'
            });
        chai.request(app)
            .post('/users')
            .send(user)            
            .then((res) => {
                const _id = res.body._id;
                // console.log(_id);
                chai.request(app)
                    .get(`/users/${_id}`)                    
                    .then((res) => {
                        const body = res.body;
                        // console.log(body);
                        res.should.have.status(200);
                        body.should.be.a('object');
                        body.should.have.property('_id');                
                        body.should.have.property('username').eq(user.username);
                        body.should.have.property('email').eq(user.email);
                        done();
                    });                
            });        
    });
        
});
