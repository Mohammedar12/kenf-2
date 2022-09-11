import bcrypt from 'bcryptjs';
import {
  body
} from 'express-validator/check';
import Order from '../../models/order.model/order.model';
import UserModel from '../../models/user.model/user.model';
import {
  checkValidations
} from '../../helpers/CheckMethods';

import ApiError from '../../helpers/ApiError';
import i18n from 'i18n'
// import config from '../../config';


const isBanded = async (id) => {
  let user = await UserModel.findOne({
    _id: id
  }, "banded")
  return user.banded
}

export default {



  validateAddorder() {
    let validations = [
      body('customer_id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('products').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async addorder(req, res, next) {
    try {
      const validatedBody = checkValidations(req);
      let query = {
        ...validatedBody,
        status: "ACCEPTED",
        paymentMethod: "CREDIT",
        paymentStatus: "SUCCESSED"
      };

      let ord = await Order.create(query)
      res.status(200).send(ord)

    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  async getUserorder(req, res, next) {
    try {
      let query = {
        deleted: false,
        stat: {
          $in: ["WAITTING", "ACCEPTED"]
        }
      }
      let {
        userId,
        carId
      } = req.query
      if (userId >= 0) {
        query.userId = userId
      }
      if (carId >= 0) {
        query.carId = carId
      }
      let ordr = await order.find(query).populate([{
        path: userId ? 'carId' : 'userId',
        populate: {
          path: "TripId",
          model: carId ? "onlineMsfr" : "onlineCar"
        }
      }])
      res.status(200).send(ordr)
    } catch (err) {
      console.log(err)
      next(err);
    }
  },
  async getOrders(req, res, next) {

    try {
      let user = req.user;
      let itemGroups = {};
      if (!req.query.id) {
        itemGroups = await Order.find({
          deleted: false
        }).populate('products.product').populate('customer_id');
      } else {
        let id = req.query.id;
        itemGroups = await Order.findOne({
          _id: id,
          deleted: false
        }).populate('products.product').populate('customer_id');
      }

      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },

};
