import mongoose, {
  Schema
} from 'mongoose';
const autoIncrementSQ = require('mongoose-sequence')(mongoose);
// import bcrypt from 'bcryptjs';
// import isEmail from 'validator/lib/isEmail';
import mongooseI18n from 'mongoose-i18n-localize'


const productSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    default: 0
  },
  name_ar: {
    type: String,
  },
  name_en: {
    type: String,

  },
  category_id: {
    type: Number,
    ref: 'items_category',

  },
  purity_id: {
    type: [Number],
    ref: 'purity',
  },
  shop_id: {
    type: Number,
    ref: 'shop',

  },
  weight: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  extra_price: {
    type: Number,
  },
  group_id: {
    type: Number,
    ref: 'items_group',

  },
  unit_id: {
    type: [Number],
    ref: 'units',

  },
  commission: {
    type: Number,
  },
  description_ar: {
    type: String,
  },
  description_en: {
    type: String,
  },
  images: {
    type: [Number],
    ref: 'upload',
  },
  meta: {
    title: String,
    keywords: [String],
    description: String,
  },
  barcode: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false
  },

  active: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true
});

productSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  }
});

productSchema.plugin(mongooseI18n, {
  locales: ['en', 'ar']
});
productSchema.plugin(autoIncrementSQ, {
  id: "product_id",
  inc_field: "_id"
});
export default mongoose.model('product', productSchema);
