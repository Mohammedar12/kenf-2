import bcrypt from 'bcryptjs';
import { body } from 'express-validator/check';
import User from '../../models/user.model/user.model';
import ApiError from '../../helpers/ApiError';
import i18n from 'i18n'
import Product from '../../models/products.model/products.model';
import {
  checkValidations
} from '../../helpers/CheckMethods';

export default {

  validateProduct() {
    let validations = [
      body('id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('seller_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('category_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('purity_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('shop_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('weight').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),

      body('quantity').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('description_ar').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('description_en').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('group_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('unit_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('commission').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('extra_price').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('images').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async product(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.files);

      if (validation.id) {
        let item = await Product.updateOne({
          _id: validation.id
        }, {
          $set: {
            seller_id: validation.seller_id,
            name_ar: validation.name_ar,
            name_en: validation.name_en,
            category_id: validation.category_id,
            purity_id: validation.purity_id,
            shop_id: validation.shop_id,
            extra_price: validation.extra_price,

            weight: validation.weight,
            quantity: validation.quantity,
            description_ar: validation.description_ar,
            description_en: validation.description_en,
            group_id: validation.group_id,
            unit_id: validation.unit_id,
            commission: validation.commission,
            images: validation.images,
          }
        }, {
          upsert: true
        }, function(err, doc) {
          if (err) return res.send(500, {
            error: err
          });
          return res.status(200).send(item);
        });

      } else {
        let newGroupUnit = await Product.create({
          _id: false,
          seller_id: validation.seller_id,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
          category_id: validation.category_id,
          extra_price: validation.extra_price,
          purity_id: validation.purity_id,
          shop_id: validation.shop_id,
          weight: validation.weight,
          quantity: validation.quantity,
          description_ar: validation.description_ar,
          description_en: validation.description_en,
          group_id: validation.group_id,
          unit_id: validation.unit_id,
          commission: validation.commission,
          images: validation.images,

        });
        console.log(newGroupUnit);
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async delProduct(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await Product.updateOne({
          _id: req.query.id
        }, {
          $set: {
            deleted: true
          }
        }, {
          upsert: true
        }, function(err, doc) {
          if (err) return res.send(500, {
            error: err
          });
          return res.status(200).send({
            success: true
          });
        });
      } else {
        next("delete items group error");
      }
    } catch (error) {
      next(error);
    }
  },
  async getProduct(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = {};
      if (!req.query.id) {
        itemGroups = await Product.find({
          deleted: false
        }).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');
      } else {
        let id = req.query.id;
        itemGroups = await Product.findOne({
          _id: id,
          deleted: false
        }).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');
      }

      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async filtredProducts(req, res, next) {
    try {
      let user = req.user;
      console.log("req");
      console.log(req.body);
      let itemGroups = await Product.find({
        deleted: false
      }).where('group_id').in(req.body.groups).where('category_id').in(req.body.categories).where('shop_id').in(req.body.shops).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async generateBarcodeProducts(req, res, next) {
    try {
      let user = req.user;
      let id = req.query.id;
      console.log("req");
      console.log(req.body);
      let barcode = id + "" + Math.floor(Date.now() / 1000);
      let doc = await Product.findOneAndUpdate({
        _id: id,
        deleted: false,
      }, {
        barcode: barcode,
      }, {
        new: true
      });
      res.status(200).send(doc.barcode);

    } catch (error) {
      next(error);
    }
  },
  async getBarcodeProducts(req, res, next) {
    try {
      let user = req.user;
      let barcode = req.query.barcode;
      var JsBarcode = require('jsbarcode');
      var {
        createCanvas
      } = require("canvas");
      var canvas = createCanvas();
      JsBarcode(canvas, barcode);


      //ending the response by sending the image buffer to the browser
      res.status(200).send(JSON.stringify(canvas.toDataURL("image/png")));

      //ending the response by sending the image buffer to the browser

    } catch (error) {
      next(error);
    }
  },
  async scanBarcodeProducts(req, res, next) {
    try {
      let barcode = req.query.barcode;
      let itemGroups = await Product.findOne({
        barcode: barcode,
        deleted: false
      }).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');

        res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
};
