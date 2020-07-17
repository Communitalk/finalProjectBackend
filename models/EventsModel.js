// Import mongoose 
const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        place: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        participantsNumber: {
            type: Number,
            required: true

        },
        organizer: {
            type: String,
            required : true
            
        },
        time:{
            type: Date, // date format e.g 2020-08-01
            required: true
        },

        date: {
            type : Date, 
            default : Date.now
        }

        
    }
);

const EventsModel = mongoose.model('events', EventsSchema);
module.exports = EventsModel;