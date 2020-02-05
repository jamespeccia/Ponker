const constants = require("../utils/constants");
const secret = require("../config/jwtsecret");


const express = require("express");
const router = express.Router();


const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {

    const {username, email, password} = req.body;

    try {
        let user = await User.findOne({username});
        if (user)
            return res.status(400).json({message: constants.USERNAME_ALREADY_EXISTS});

        user = await User.findOne({email});
        if (user)
            return res.status(400).json({message: constants.EMAIL_ALREADY_EXISTS});

        user = new User({username, email, password});

        user.password = await bcrypt.hash(password, 10);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };

        jwt.sign(payload, secret.JWT_SECRET, (err, token) => {
            if (err)
                return res.status(200).json({message: constants.REGISTER_SUCCESS});
            return res.status(200).json({message: constants.REGISTER_SUCCESS, token});
        });

    } catch (err) {
        return res.status(500).json({message: constants.INTERNAL_SERVER_ERROR});
    }
});

router.post("/login", async (req, res) => {

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (user) {
            return bcrypt.compare(password, user.password, (err, result) => {
                if (err)
                    return res.status(400).json({message: constants.INTERNAL_SERVER_ERROR});

                else if (result) {
                    const payload = {
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    };

                    return jwt.sign(payload, secret.JWT_SECRET, (err, token) => {
                        if (err)
                            return res.status(200).json({message: constants.LOGIN_SUCCESS});
                        return res.status(200).json({message: constants.LOGIN_SUCCESS, token});
                    });
                } else
                    return res.status(401).json({message: constants.LOGIN_FAILURE});
            });
        }
        return res.status(401).json({message: constants.LOGIN_FAILURE});
    } catch (e) {
        return res.status(400).json({message: constants.INTERNAL_SERVER_ERROR});
    }
});

router.get("/:username", async (req, res) => {
    const {username} = req.params;

    let foundUser = await User.findOne({username});
    if (foundUser) {
        const user = {username: foundUser.username};
        return res.status(200).json({message: constants.USER_FOUND, user});
    } else
        return res.status(200).json({message: constants.USER_NOT_FOUND});
});

router.get("/", async (req, res) => {
    return await User.find({}, (err, users) => {
        if (err)
            return res.status(500).json({message: constants.INTERNAL_SERVER_ERROR});
        let userList = [];
        for (let i = 0; i < users.length; i++) {
            userList.push(users[i].username)
        }
        return res.status(200).json({message: constants.USERS_FOUND, users: userList});
    });
});

router.put("/avatar", (req, res) => {
    if (req.files === null)
        return res.status(400).json({msg: 'No file uploaded'});

    const user = isAuthorized(req.headers.authorization);
    if (!user)
        return res.status(404).json({message: "error"});

    console.log(req);

    const file = req.files.file;
    file.mv(`${__dirname}/storage/users/${user.id}/avatar.jpg`, err => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: "error"});
        }

        res.json({message: "SUCCESS"});
    });
});

function isAuthorized(authorizationHeader) {
    let decodedToken;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
        const token = authorizationHeader.substring(7);
        try {
            decodedToken = jwt.verify(token, secret.JWT_SECRET);
            console.log(decodedToken);
            return decodedToken.user;
        } catch (err) {
            return null;
        }
    } else {
        return null;
    }
}


module.exports = router;