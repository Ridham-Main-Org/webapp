const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');
const request = require('supertest');

const expect = chai.expect;
chai.use(chaiHttp);
let createdUser;
let userData;


before(async() => {
    const response = await chai.request(app)
        .get('/healthz');
    if (response.statusCode == 200) {
        console.log("connection successful");
    }    
});

describe('User API', () => {
    // let createdUserId;
    it('should create a new user successfully', (done) => {
        userData = {
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe@example.com',
            password: 'password123'
        };

        request(app)
            .post('/v1/user')
            .send(userData)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                createdUser = res.body;
                expect(res.body.username).to.equal(userData.username);
                done();
            });
    });

    it('get user testing api', (done) => {
                    
        const credentials = Buffer.from(`${createdUser.username}:${userData.password}`).toString('base64');
        const authHeader = `Basic ${credentials}`;

        request(app)
            .get(`/v1/user/self`)
            .set("Authorization", authHeader)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.deep.equal(createdUser);
                done();
            });

        // expect(res1).to.have.status(200);
        // expect(res1.body.username).to.equal(userData.username);

        // createdUserId = res1.body.id; // Store the created user's ID for later use
    });
});

describe('PUT /v1/user/self', () => {
    it('should update a user account and validate the update using GET call', () => {

        const credentials = Buffer.from(`${createdUser.username}:${userData.password}`).toString('base64');
        const authHeader = `Basic ${credentials}`;

        // userData = {
        //     first_name: 'John',
        //     last_name: 'Doe',
        //     username: 'johndoe@example.com',
        //     password: 'password123'
        // };
        // Update the user account
        const updatedData = {
            first_name: 'John Muriel',
            last_name: 'Smith',
            password: 'password456'
        };

        request(app)
            .put(`/v1/user/self`)
            .set("Authorization", authHeader)
            .send(updatedData)
            .expect(204)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });


        // expect(resGet).to.have.status(200);
        // expect(resGet.body.first_name).to.equal(updatedData.first_name);
        // expect(resGet.body.last_name).to.equal(updatedData.last_name);
        // expect(resGet.body.username).to.equal(userData.username);
    });
});

