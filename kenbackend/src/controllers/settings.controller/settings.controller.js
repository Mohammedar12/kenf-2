import User from '../../models/user.model/user.model';
import SystemInfo from '../../models/system_info.model/system_info.model';
import ItemGroup from '../../models/settings.model/items_group.model';
import ItemCategory from '../../models/settings.model/items_category.model';
import Units from '../../models/settings.model/units.model';
import Purity from '../../models/settings.model/purity.model';
import PM from '../../models/settings.model/payment_method.model';
import OrderStatus from '../../models/settings.model/order_status.model';

import ApiResponse from "../../helpers/ApiResponse";
import {
  checkExistThenGet
} from "../../helpers/CheckMethods";
import {
  body
} from 'express-validator/check';
import {
  checkValidations
} from '../../helpers/CheckMethods';
import i18n from 'i18n';
// import config from '../../config'
const populateQuery = [{
  path: 'user',
  model: 'user'
}];


export default {

  validateSystemInfo() {
    let validations = [
      body('app_name').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('phone').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('city').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('region').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('zip').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('address').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('vat').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('vat_number').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('commission').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('currency').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('logo').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),

    ];
    return validations;
  },
  async updateSystemInfo(req, res, next) {
    try {
      const validation = checkValidations(req);

      console.log(validation);
      let to_return = await SystemInfo.findOneAndUpdate({}, {
        ...validation
      }, {
        new: true
      });

    } catch (err) {
      next(err);
    }
  },
  async getSystemInfo(req, res, next) {
    try {
      let user = req.user;
      let system = await SystemInfo.findOne();
      console.log(system);
      res.status(200).send(system);

    } catch (error) {
      next(error);
    }
  },
  validateItemGroup() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async itemGroup(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await ItemGroup.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await ItemGroup.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getItemGroup(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await ItemGroup.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  validateDelItemGroup() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async delItemGroup(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await ItemGroup.updateOne({
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

  validateItemCategory() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async itemCategory(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await ItemCategory.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await ItemCategory.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getItemCategory(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await ItemCategory.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  validateDelItemCategory() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async delItemCategory(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await ItemCategory.updateOne({
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

  validatePurity() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async purity(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await Purity.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await Purity.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getPurity(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await Purity.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  validateDelPurity() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async delPurity(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await Purity.updateOne({
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

  validateUnits() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async units(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await Units.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await Units.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getUnits(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await Units.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  validateDelUnits() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async delUnits(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await Units.updateOne({
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
  /******/

  validateOrderStatus() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async orderStatus(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await OrderStatus.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await OrderStatus.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getOrderStatus(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await OrderStatus.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delOrderStatus(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await OrderStatus.updateOne({
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
  /***/
  validatePM() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async pm(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await PM.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await PM.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getPM(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await PM.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delPM(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await PM.updateOne({
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
}
