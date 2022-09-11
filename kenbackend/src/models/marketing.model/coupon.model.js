import mongoose, {
  Schema
} from "mongoose";
const autoIncrementSQ = require('mongoose-sequence')(mongoose);
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const coupon = new Schema({
  _id: {
    type: Number,
    required: true
  },

  code: {
    type: String,
  },

  discount: {
    type: Number,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  },

}, {
  timestamps: true
});

coupon.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


coupon.plugin(autoIncrementSQ, {
  id: "coupon_id",
  inc_field: "_id"
});
coupon.plugin(mongooseI18nLocalize, {
  locales: ['ar', 'en']
});

export default mongoose.model('coupon', coupon);
