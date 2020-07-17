// Import mongoose 
const mongoose = require('mongoose');

const GroupCreationSchema = new mongoose.Schema(
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

        
    }
);

const GroupCreationModel = mongoose.model('groups', GroupCreationSchema);
module.exports = GroupCreationModel;