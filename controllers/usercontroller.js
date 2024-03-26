const User = require('../models/User');
const bcrypt = require('bcrypt');
const logger = require('../logger');
const pubsub = require('./pubsubcontroller');
const verifycontroller = require('./verifycontroller');

const dotenv = require('dotenv');
dotenv.config({ path: __dirname + "/.env" });

const { validateEmptyAndType, isEmailValid, isNameValid } = require('../util');

const validateFields = (body) => {

    for (const field of Object.keys(body)) {
        if (!validateEmptyAndType(body[field])) {
            return false;
        }
        if (field === 'first_name' && !isNameValid(body[field])) {
            return false;
        }
        if (field === 'last_name' && !isNameValid(body[field])) {
            return false;
        }
    }
    return true;
}

const checkAllowedFields = (body, validFields) => {;
    // const validFields = new Set(['first_name', 'last_name', 'password']);

    for (const field of Object.keys(body)) {
        if (!validFields.has(field)) {
            return false;
        } else {
            validFields.delete(field);
        }
    }
    
    if (validFields.size > 0) {
        return false;
    }
    return true;
}

/*
User CREATE api
*/
const createUser = async (req, res) => {
    try {
        delete req.body.account_created;
        delete req.body.account_updated;
        
        if (!req.body.username) {
            logger.error("Username not provided!");
            return res.status(400).send();
        }   
        if (!isEmailValid(req.body.username)) {
            logger.error("Invalid email!");
            return res.status(400).send();
        }

        if (!checkAllowedFields(req.body,new Set(['first_name', 'last_name', 'password','username'])) || !validateFields(req.body)) {
            logger.warn("Allowed fields not specified");
            return res.status(400).send();
        };

        const { username, password, first_name, last_name } = req.body;
        const exisitingUser = await User.findOne({ where: { username } });
        if (exisitingUser) {
            logger.error("User with this email already exists");
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        const topic= 'projects/celestial-gecko-414117/topics/demotopic'
        const data = JSON.stringify({ username: username });
        console.log("reached here");
        logger.info("reached here- before publishing message");
        await pubsub.publishMessage(topic, data);
        logger.info("message published");
        const newUser = await User.create({
            username,
            password,
            first_name,
            last_name,
        })

        const userWithoutPassword = {
            id: newUser.id,
            username: newUser.username,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            account_created: newUser.account_created,
            account_updated: newUser.account_updated,
        };
        logger.info("User created successfully");
        return res.status(201).json(userWithoutPassword);

    } catch (error) {
        logger.error("Bad request in creating user");
        res.status(400).send();
    }
}

/*
User GET api
*/
const getUser = async (req, res) => {
    const userData = req.user;
    if (req.body && (Object.keys(req.body).length || Object.keys(req.query).length)) {
        logger.error("Bad request in GET api");
        return res.status(400).send();
    }
    try {
        // const verifyRes = await verifycontroller.isUserVerified();
        let responseData;
        responseData = {
            id: userData.id,
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name,
            account_created: userData.account_created,
            account_updated: userData.account_updated,
            status: verificationStatus,
        }
        logger.info("Get user successful with verified status");
        res.status(200).json(responseData);

        // if ( verifyRes && res.verifyRes) {
        //     if (verificationStatus === 'not verified') {
        //         logger.error("User not verified");
        //         res.status(403).json({ error: 'User not verified' });
        //     } else {
        //         responseData = {
        //             id: userData.id,
        //             username: userData.username,
        //             first_name: userData.first_name,
        //             last_name: userData.last_name,
        //             account_created: userData.account_created,
        //             account_updated: userData.account_updated,
        //             status: verificationStatus,
        //         }
        //         logger.info("Get user successful with verified status");
        //         res.status(200).json(responseData);
        //     }  
        // }
        // logger.error("Verification status not found");
        // res.status(403).json({ error: 'Verification status not found' });
    } catch (error) {
        logger.error("Error in getUser, here it caused Internal server error");
        res.status(500).json({ error: 'here it caused Internal server error' });
    }
}

/*
User UPDATE api
*/
const updateUser = async (req, res) => {
    try{
        delete req.body.account_created;
        delete req.body.account_updated;
        const reqBody = req.body;

        if (!checkAllowedFields(req.body, new Set(['first_name', 'last_name', 'password']))) {
            logger.warn("Allowed fields not specified");
            return res.status(400).send();
        };

        if (!validateFields(req.body)) {
            logger.error("Invalid values in the request body");
            return res.status(400).send();
        };

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.update(req.body, {
            where: {
                username: req.user.username,
            },
        });
        logger.info("User updated successfully");
        res.status(204).send();

    } catch (error) {
        logger.error("Bad request in updating user");
        res.status(400).send();
    }
}
module.exports = { createUser, updateUser, getUser }