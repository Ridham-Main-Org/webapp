const User = require('../models/User');
const bcrypt = require('bcrypt');

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
    console.log("here in checkAllowedFields");
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

const createUser = async (req, res) => {
    try {
        console.log(" request", Object.keys(req.body));
        delete req.body.account_created;
        delete req.body.account_updated;
        
        if (!req.body.username) {
            return res.status(400).send();
        }   
        if (!isEmailValid(req.body.username)) {
            return res.status(400).send();
        }

        if (!checkAllowedFields(req.body,new Set(['first_name', 'last_name', 'password','username'])) || !validateFields(req.body)) {
            return res.status(400).send();
        };

        const { username, password, first_name, last_name } = req.body;
        const exisitingUser = await User.findOne({ where: { username } });
        if (exisitingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        
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
        res.status(201).json(userWithoutPassword);

    } catch (error) {
        res.status(500).send();
    }
}

const getUser = async (req, res) => {
    const userData = req.user;
    if (req.body && (Object.keys(req.body).length || Object.keys(req.query).length)) {
        return res.status(400).send();
    }
    const responseData = {
        id: userData.id,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        account_created: userData.account_created,
        account_updated: userData.account_updated,
    }
    res.status(200).json(responseData);
}

const updateUser = async (req, res) => {
    try{
        delete req.body.account_created;
        delete req.body.account_updated;

        if (!checkAllowedFields(req.body, new Set(['first_name', 'last_name', 'password']))) {
            return res.status(400).send();
        };

        if (!validateFields(req.body)) {
            return res.status(400).send();
        };

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.update(req.body, {
            where: {
                username: req.user.username,
            },
        });
        res.status(204).send();

    } catch (error) {
        res.status(500).send();
    }
}
module.exports = { createUser, updateUser, getUser }