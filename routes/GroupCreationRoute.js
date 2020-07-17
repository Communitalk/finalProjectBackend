// importing packages 

const express = require('express');
const router = express.Router();
const GroupCreationModel = require('../models/GroupCreationModel.js');

// A post route for saving data in the Products collection 

router.post(
    '/createGroup', 
    (req, res) =>{

        // read the body within the Post request
        const formData = {
            name: req.body.name,
            floor : req.body.floor, 
            building : req.body.building,
            area : req.body.area, 
            image : req.body.image
        };
        console.log("From the user ", formData); 
       
        // save data in database 
        const newGroupCreationModel = new GroupCreationModel(formData);
        newGroupCreationModel.save(
            (err,dbResult)=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.send('Group has been created!');
                }
                
            }
        );

        
    }
);
module.exports = router;