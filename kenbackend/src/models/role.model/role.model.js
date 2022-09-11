import mongoose, { Schema } from "mongoose";
const autoIncrementSQ = require('mongoose-sequence')(mongoose);
import mongooseI18nLocalize from 'mongoose-i18n-localize';

const RoleSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },

    name: {
      type: String,
      required: true
    },
    user_id: { //created_by
      type: Number,
      required: true
    },
    permissions: {
      type: [Number],
    },
    deleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

RoleSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});


RoleSchema.plugin(autoIncrementSQ , { id: "role_id", inc_field: "_id" });
RoleSchema.plugin(mongooseI18nLocalize, { locales: ['ar', 'en'] });

export default mongoose.model('role', RoleSchema);
