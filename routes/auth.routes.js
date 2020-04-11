const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();


//auth register

router.post(
    '/register',
    [
        check('login', 'incorrect').isLength({min: 5, max: 17}),
        check('password', 'incorrect').isLength({min: 5, max: 17})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data'
                })
            }
            const {login, password} = req.body;

            const candidate = await User.findOne({login});

            if (candidate) {
                return res.status(400).json({message: 'username is occupied'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({login, password: hashedPassword});

            await user.save();

            res.status(201).json({message: 'complete'});

        } catch (e) {
            res.status(500).json({message: 'something went wrong'})
        }
    }
);

// auth login

router.post(
    '/login',
    [
    check('login', 'enter correct login').isLength({min: 5, max: 17}),
    check('password', 'enter correct password').isLength({min: 5, max: 17})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data'
                });
            }
            const {login, password} = req.body;
            const user = await User.findOne({login});

            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'incorrect password'})
            }

            const token = jwt.sign(
                { user: user.id },
                config.get('jwtSecret'),
                { expiresIn: '2d' }
            );

            res.json({ token, userId: user.id, userName: login })

        } catch (e) {
            res.status(500).json({message: 'something went wrong'});
        }
    }
);

module.exports = router;