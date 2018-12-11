const boom = require('boom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/user');

exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const foundUser = await User.findOne({username: username});
        if (foundUser) {
            const isValid = bcrypt.compareSync(password, foundUser.password);
    
            if (isValid) {
                const token = jwt.sign({
                    username: foundUser.username,
                    id: foundUser._id
                }, config.secret, {
                    expiresIn: 60 * 60 * 24 * 7
                });

                return {
                    "message": "Login successful",
                    "token": token
                }
            }
            return {
                "message": "Invalid password"
            }
        } else {
            return {
                "message": "No such user exists"
            }
        }
    } catch (err) {
        console.log(err);
        throw boom.boomify(err)
    }
}

exports.signup = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username: username});
    if (user) {
        return {
            "message": "Username taken"
        };
    }

    try {
        const createdUser = await User.create({
            username, password
        });

        const token = jwt.sign({
            username: createdUser.username,
            id: createdUser._id
        }, config.secret, {
            expiresIn: 60 * 60 * 24 * 7
        });
        
        return {
            "message": "User created",
            "token": token
        }
    } catch (err) {
        console.log(err);
        throw boom.boomify(err)
    }
}