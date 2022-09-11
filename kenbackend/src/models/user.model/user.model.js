import mongoose, {
  Schema
} from 'mongoose';
const autoIncrementSQ = require('mongoose-sequence')(mongoose);
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import mongooseI18n from 'mongoose-i18n-localize';


const userSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    default: 0
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Invalid Email Syntax'
    }
  },
  password: {
    type: String,
  },
  phoneVerified:{
    type: Boolean,
    default: false,
  },
  emailVerified:{
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  token: {
    type: String,
    required: false,
  },

  status: {
     type: String,
     enum: ['Pending', 'Active'],
     default: 'Pending'
   },

  phone: {
    type: String,
  },
  landline: {
    type: String,
    trim: true
  },
  deviceId: {
    type: String,
  },
  confirmationCode: {
      type: String,
      unique: true
  },
  user_role: {
      type: Number,
      ref: "user_role",
      required: true,
  },
  type: {
    type: String,
    enum: ['ADMIN', 'USER'],
    required: true,
    default: 'USER'
  },
  active:{
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  },

  // city: { //المحافظة
  //   type: Number,
  //   ref: "place"
  // },

  ////////////////////////////////////////////////


  //
  // image: {
  //   type: String
  // },
  // notification: {
  //   type: Boolean,
  //   default: true
  // },
  // /////////////////////////////////////////
  // phones: [String],
  // // socialLinks:{
  // //     type: [{key:{type:String } , value:{type:String}}]
  // // },
  // searchKeys: [String],
  // views: {
  //   type: Number,
  //   default: 0
  // },
  // follow: {
  //   type: Boolean,
  //   default: false
  // },
  // favorite: {
  //   type: Boolean,
  //   default: false
  // },

}, {
  timestamps: true
});

//userSchema.index({ geoLocation: "2dsphere" });

// userSchema.pre('save', function (next) {
//     const account = this;
//     if (!account.isModified('password')) return next();
//     const salt = bcrypt.genSaltSync();
//     bcrypt.hash(account.password, salt).then(hash => {
//         account.password = hash;
//         next();
//     }).catch(err => console.log(err));
// });
// userSchema.methods.isValidPassword = function (newPassword, callback) {
//     let user = this;
//     bcrypt.compare(newPassword, user.password, function (err, isMatch) {
//         if (err)
//             return callback(err);
//         callback(null, isMatch);
//     });
// };

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  }
});

userSchema.plugin(mongooseI18n, {
  locales: ['en', 'ar']
});
userSchema.plugin(autoIncrementSQ, {
  id: "user_id",
  inc_field: "_id"
});
export default mongoose.model('user', userSchema);
