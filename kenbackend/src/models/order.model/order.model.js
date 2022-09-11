import mongoose, { Schema } from "mongoose";
import mongooseI18n from "mongoose-i18n-localize";
const autoIncrementSQ = require('mongoose-sequence')(mongoose);

let productSchema = new Schema({
    product: { type: Number, required: true, ref:'product'},
    quantity: { type: Number, required: true },
    price:{type: Number ,required: true},
    offer:{type: Number ,default:0},
    priceAfterOffer:{type: Number},
    // color:{type: Number},
    // size:{type: Number},
    taxes:{  type: Number },
    taxesValue:{   type: Number  }
});

const orderSchema = new Schema({
    order_id: {
        type: Number,
        required: true,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    },
    customer_id: {
        type: Number,
        ref: 'customer',
        required: true
    },
    products: {
      type: [productSchema]
    },
    status: {
        type: String,
        enum: ['WAITING',
            'ACCEPTED',
            'REJECTED',
            'CANCELED',
            'SHIPPED','PREPARED','HAND_OVERED',
            'DELIVERED'],
        default: 'WAITING'
    },
    rejectReason:{
        type: String
    },
    paymentMethod: {
        type: String,
        enum: ['CASH', 'CREDIT']
    },
    // creditCard: {
    //     type: Number,
    //     ref: 'credit'
    // },


    /////////////////////////////////////////
    offer_id:{
        type: Number,
        ref:'offer'
    },
    coupon_id:{
        type: Number,
        ref:'coupon'
    },
    price:{
        type: Number
    },
    totalPrice:{
        type: Number
    },

    discountValue:{
        type: Number,
        default:0
    },

    ///////////////////////////////////////////////////////
    checkoutId:{
        type:String
    },
    paymentId:{
        type:String
    },
    paymentStatus:{
        type:String,
        enum:['PENDING','FAILED','SUCCESSED','REFUNDED'],

    }

});


// orderSchema.set('toJSON', {
//     transform: function (doc, ret, options) {
//         ret.id = ret._id;
//         delete ret._id;
//         delete ret.__v;
//     }
// });
//const autoIncrement = autoIncrementSQ(mongoose.connection);
orderSchema.plugin(autoIncrementSQ , { inc_field: "order_id" });
orderSchema.plugin(mongooseI18n, { locales: ['ar', 'en'] });

export default mongoose.model('order', orderSchema);
