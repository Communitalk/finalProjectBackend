// Import mongoose 
const mongoose = require('mongoose');

const GroupsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        floor: {
            type: Number,
            required: true
        },
        building: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true

        },
        image: {
            type: String,
            

        },
        date: {
            type : Date, 
            default : Date.now
        }

        
    }
);

const GroupsModel = mongoose.model('groups', GroupsSchema);
module.exports = GroupsModel;