import express from 'express';
// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
import marketController from '../../controllers/market.controller/market.controller';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
import requireAuth from '../../middlewares/auth';
const router = express.Router();


router.route('/category')
  .get(requireAuth, marketController.getCategory)
  .post(requireAuth, marketController.validateCategory(), marketController.category)
  .delete(requireAuth, marketController.delCategory);

router.route('/offer')
  .get(requireAuth, marketController.getOffer)
  .post(requireAuth, marketController.validateOffer(), marketController.offer)
  .delete(requireAuth, marketController.delOffer);

router.route('/coupon')
  .get(requireAuth, marketController.getCoupon)
  .post(requireAuth, marketController.validateCoupon(), marketController.coupon)
  .delete(requireAuth, marketController.delCoupon);




export default router;
