import express from 'express';
// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
import productsController from '../../controllers/products.controller/products.controller';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();


router.route('/').get(requireAuth, productsController.getProduct)
  .post(requireAuth, productsController.validateProduct(), productsController.product)
  .delete(requireAuth, productsController.delProduct);
  router.route('/filter').post(requireAuth, productsController.filtredProducts);
  router.route('/generateBarcode').get(requireAuth, productsController.generateBarcodeProducts);
  router.route('/getBarcode').get(requireAuth, productsController.getBarcodeProducts);
  router.route('/scanBarcode').get(requireAuth, productsController.scanBarcodeProducts);

export default router;
