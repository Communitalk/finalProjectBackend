// importing packages 

const express = require('express');
const router = express.Router();
const GroupsModel = require('../models/GroupsModel.js');

// A post route for saving data in the groups collection 

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
        const newGroupsModel = new GroupsModel(formData);
        newGroupsModel.save(
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

router.post(
    '/updateGroup', 
    (req, res) =>{

        // read the body within the Post request
        const formData = {
            name: req.body.name, 
            image : req.body.image,
            _id: req.body._id
        };
           
        // updating the group
        GroupsModel.findOneAndUpdate({_id: formData._id}, // search critteria
        {name: formData.name, image: formData.image }, // keys and values to update
        {}, // options
        (err,document) => {
            if(err) {
                console.log(err);
            }else{
                res.json(
                    {
                        message: "The group has been updated!",
                        document : document
                    }
                )
            }
        }
        )

        
    }
);

router.get(
    '/', 
    (req, res) =>{
      

            // (1) Fetch all the documents using .find()
            GroupsModel.find()
    
            // (2) Once the results are ready, use .json() to send the results
            .then(
                (results) => {
                    // res.json = res.send() + converts to JSON
                    res.json({groups: results})
                }
            )
            .catch( 
                (e)=> {
                    console.log('error occured ', e)
                }
            );
        
           

        
    }
);
module.exports = router;