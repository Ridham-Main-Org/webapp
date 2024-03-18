const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');
const logger = require('./logger');

const expect = chai.expect;
chai.use(chaiHttp);

before(async() => {
    const response = await chai.request(app)
        .get('/healthz');
    if (response.statusCode == 200) {
        console.log("connection successful");
    }    
});

describe('User API', () => {
    let createdUserId;

    describe('POST /v1/user', () => {
        it('should create a new user successfully', async () => {
            const userData = {
                first_name: 'John',
                last_name: 'Doe',
                username: 'johndoe@example.com',
                password: 'password123'
            };

            await chai.request(app)
                .post('/v1/user')
                .send(userData);

            const res1 = await chai.request(app)
                .get(`/v1/user/self`)
                .auth(userData.username, userData.password); // Basic authentication

            expect(res1).to.have.status(200);
            expect(res1.body.username).to.equal(userData.username);

            createdUserId = res1.body.id; // Store the created user's ID for later use
        });
    });
});

describe('PUT /v1/user/self', () => {
    it('should update a user account and validate the update using GET call', async () => {
        const userData = {
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe@example.com',
            password: 'password123'
        };
        // Update the user account
        const updatedData = {
            first_name: 'John Muriel',
            last_name: 'Smith',
            password: 'password456'
        };

        await chai.request(app)
            .put(`/v1/user/self`)
            .auth(userData.username, userData.password)
            .send(updatedData);

        // Validate the update using GET call
        const resGet = await chai.request(app)
            .get(`/v1/user/self`)
            .auth(userData.username, updatedData.password);

        expect(resGet).to.have.status(200);
        expect(resGet.body.first_name).to.equal(updatedData.first_name);
        expect(resGet.body.last_name).to.equal(updatedData.last_name);
        expect(resGet.body.username).to.equal(userData.username);
    });
});

