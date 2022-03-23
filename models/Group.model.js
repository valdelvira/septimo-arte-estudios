const { Schema, model } = require('mongoose');

const groupSchema = new Schema({

    groupName: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },

    userCreator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],


    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],

    imageURL:
    {
        type: String,
    }
},
    {
        timestamps: true,
    }
)

const Group = model('Group', groupSchema);

module.exports = Group