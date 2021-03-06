const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

const UsersModel = require('../models/UsersModel');

router.post(
    '/register',     
    (req, res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            community: req.body.community,
            building: req.body.building,
            floor: req.body.floor,
            email: req.body.email,
            password: req.body.password
        };

        bcrypt.genSalt(
            (err, salt) => {

                bcrypt.hash(
                    formData.password, 
                    salt, 
                    (err, hashedPassword) => {

                        const newUsersModel = new UsersModel(formData);

                
                        newUsersModel.password = hashedPassword;

                        newUsersModel.save(
                            (err, dbResult) => {

                                if(err) {
                                    res.json({message:err});
                                }
                                else {
                                    res.json({message:"User has been saved"});
                                }
                            }
                        );

                    }
                )
            }
        );
    }
);

router.post(
    '/login',
    (req, res) => {

        const formData = {
            email: req.body.email,
            password: req.body.password
        }

        UsersModel.findOne(
            {email: formData.email},
            (err, document) => {

                if(!document) {
                    res.json({message:"Please check email or password"});
                }

                else {

                    bcrypt.compare(formData.password, document.password)
                    .then(
                        (isMatch) => {

                            if(isMatch === true) {
                                const payload = { 
                                    id: document.id,
                                    email: document.email
                                };

                                jwt.sign(
                                    payload,
                                    secret,
                                    (err, jsonwebtoken) => {
                                        res.json(
                                            {
                                                message: 'Login successful',
                                                jsonwebtoken: jsonwebtoken
                                            }
                                        )
                                    }
                                )

                            }

                            else {
                                res.json({message:"Please check email or password"})
                            }
                        }
                    )
                }
                

            }
        )
    }
)

module.exports = router;