const boom = require('boom');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const foundUser = await User.findOne({username: username});
        if (foundUser) {
            const isValid = bcrypt.compareSync(password, foundUser.password);
    
            return {
                "message": isValid ? "Login successful" : "Invalid password"
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
        return {
            "message": "User created"
        }
    } catch (err) {
        console.log(err);
        throw boom.boomify(err)
    }
}