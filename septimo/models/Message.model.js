const { Schema, model } = require("mongoose");

const messageSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },

    message: {
        type: String,
        minlength: 2,
        maxlength: 280
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },


    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },

},
    {
        timestamps: true,
    }
)

const Message = model("Message", messageSchema);

module.exports = Message