import express from 'express';
// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
import shopController from '../../controllers/shop.controller/shop.controller';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();



router.route('/').get(requireAuth, shopController.getShops)
  .post(requireAuth, shopController.validateShop(), shopController.shop)
  .delete(requireAuth, shopController.delShop);

export default router;
