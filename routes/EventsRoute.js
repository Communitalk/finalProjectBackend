// importing packages 

const express = require('express');
const router = express.Router();
const EventsModel = require('../models/EventsModel.js');

// A post route for saving data in the groups collection 

router.post(
    '/createEvent', 
    (req, res) =>{

        // read the body within the Post request
        const formData = {
            name: req.body.name,
            place : req.body.place, 
            description : req.body.description,
            participantsNumber: req.body.participantsNumber, 
            organizer : req.body.organizer,
            time : req.body.time
        };
        console.log("From the user ", formData); 
       
        // save data in database 
        const newEventsModel = new EventsModel(formData);
        newEventsModel.save(
            (err,dbResult)=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.send('Event has been created!');
                }
                
            }
        );

        
    }
);

router.post(
    '/updateEvent', 
    (req, res) =>{

        // read the body within the Post request
        const formData = {
            place : req.body.place,
            participantsNumber: req.body.participantsNumber, 
            time : req.body.time,
            _id : req.body._id
        };
           
        // updating the group
        EventsModel.findOneAndUpdate({_id: formData._id}, // search critteria
        {place : formData.place,  participantsNumber: formData.participantsNumber, time : formData.time }, // keys and values to update
        {}, // options
        (err,document) => {
            if(err) {
                console.log(err);
            }else{
                res.json(
                    {
                        message: "The event has been updated!",
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
            EventsModel.find()
    
            // (2) Once the results are ready, use .json() to send the results
            .then(
                (results) => {
                    // res.json = res.send() + converts to JSON
                    res.json({events: results})
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