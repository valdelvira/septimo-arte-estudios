const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 15
    },
    password: {
      type: String,
      required: true,
    },
    favoritesMovies: [String],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    }],

    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Introduzca su e-mail'],
      validate: function (email) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)
      }
    },
    imageURL: {
      type: String,
      default: 'https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg'

    },
    birth: {
      type: Date
    },
    sex: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other']
    }
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema);
// User.syncIndexes();
module.exports = User


