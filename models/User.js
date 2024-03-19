const bcrypt = require('bcrypt');
const logger = require('../logger');

const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define("user", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

    },
    last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

    },
    username: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        isEmail: true // checks for email format
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
},  
{   
    createdAt: 'account_created',
    updatedAt: 'account_updated',
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },
});

User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
};

sequelize.sync()
    .then(() => {
        console.log('Database synchronized!');
        logger.info('Database synchronized!');
})
    .catch((error) => {
        console.error('Failed to synchronize database:', error);
        logger.error('Failed to synchronize database');
    });

module.exports = User;

