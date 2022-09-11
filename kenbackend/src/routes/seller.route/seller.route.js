import express from 'express';
// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
import sellerController from '../../controllers/seller.controller/seller.controller';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();


router.route('/').get(requireAuth, sellerController.getSeller)
  .post(requireAuth, sellerController.validateSeller(), sellerController.seller)
  .delete(requireAuth, sellerController.delSeller);

export default router;
