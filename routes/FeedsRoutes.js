const express = require('express');

const router = express.Router();

const FeedsModel = require('../models/FeedsModel');

router.post(
    '/',
    (req, res) => {

        const formData = {
            text: req.body.text,
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image
        };

        const newFeedModel = new FeedsModel(formData);
        newFeedModel.save();

        res.send('Your POST has been received.');
    }
);

router.post(
    '/likes',
    (req, res) => {

        const formData = {
            id: req.body.id,
            hashtags: req.body.hashtags,
            text: req.body.text,
            username: req.body.text,
            likes: req.body.likes,
            image: req.body.image,
            date: req.body.date
        };

        const likesModel = new FeedsModel(formData);
        likesModel.update(
            {likes: formData.id},
            (err, id) => {

                if(!id) {
                    res.send("You can like this post");
                }
                else {
                    res.send("Your like has already been registered!");
                }
                
            }
        );
    }
);

router.get(
    '/',
    (req, res)=>{

        FeedsModel.find()

        .then(
            (results) => {
                res.json(results)
            }
        )
        .catch( 
            (e)=> {
                console.log('error occured', e)
            }
        );

    }
);

module.exports = router;
