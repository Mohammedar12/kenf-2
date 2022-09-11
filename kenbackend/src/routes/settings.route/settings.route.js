import express from 'express';
// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
import settingsController from '../../controllers/settings.controller/settings.controller';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
import requireAuth from '../../middlewares/auth';
const router = express.Router();


router.route('/sys_info')
  .get(requireAuth, settingsController.getSystemInfo)
  .post(requireAuth, settingsController.validateSystemInfo(), settingsController.updateSystemInfo);

router.route('/items_group')
  .get(requireAuth, settingsController.getItemGroup)
  .post(requireAuth, settingsController.validateItemGroup(), settingsController.itemGroup)
  .delete(requireAuth, settingsController.delItemGroup);

router.route('/items_category')
  .get(requireAuth, settingsController.getItemCategory)
  .post(requireAuth, settingsController.validateItemCategory(), settingsController.itemCategory)
  .delete(requireAuth, settingsController.delItemCategory);

router.route('/units')
  .get(requireAuth, settingsController.getUnits)
  .post(requireAuth, settingsController.validateUnits(), settingsController.units)
  .delete(requireAuth, settingsController.delUnits);


router.route('/purity')
  .get(requireAuth, settingsController.getPurity)
  .post(requireAuth, settingsController.validatePurity(), settingsController.purity)
  .delete(requireAuth, settingsController.delPurity);

router.route('/pm')
  .get(requireAuth, settingsController.getPM)
  .post(requireAuth, settingsController.validatePM(), settingsController.pm)
  .delete(requireAuth, settingsController.delPM);

router.route('/order_status')
  .get(requireAuth, settingsController.getOrderStatus)
  .post(requireAuth, settingsController.validateOrderStatus(), settingsController.orderStatus)
  .delete(requireAuth, settingsController.delOrderStatus);


export default router;
