import express from 'express';
// import { requireAuth } from '../../services/passport';
// import { multerSaveTo } from '../../services/multer-service';
import userController from '../../controllers/user.controller/user.controller';
// import { parseObject } from '../../controllers/shared.controller/shared.controller';
import requireAuth from '../../middlewares/auth';

const router = express.Router();


//router.route('/activate-phone').put(requireAuth,userController.validateResendCode(),userController.sendActivateCode)
//router.route('/confirm-activate-phone').put(requireAuth,userController.validateVerifyPhone(),userController.confirmActivateCode)
//router.route('/addTrader')
//.post(multerSaveTo('users').fields([{ name: 'image', maxCount: 1 }, { name: 'commercialRecord', maxCount: 1 }, { name: 'taxCard', maxCount: 1 }]),
//parseObject([ 'workPeriods', 'workDays' , 'location', 'username', 'socialLinks', 'phones', 'slider', 'searchKeys', 'subCategories', 'storeEmployees', 'region']),
//        requireAuth, userController.validateDriverAddTrader(), userController.addTrader)

// router.route('/addMarket')
//     .post(multerSaveTo('users').single('image'),
//         parseObject(['categories','location', 'username', 'socialLinks', 'phones', 'slider', 'searchKeys', 'subCategories', 'storeEmployees', 'region']),
//         requireAuth, userController.validateDriverAddMarket(), userController.addMarket)

// router.route('/increaseViews').post(userController.validateIncreaseViews(), userController.increaseViews)
// router.route('/traderStatistics').get(requireAuth, userController.traderGetStatistics)

// router.route('/user/openActiveChatHead').put(requireAuth, userController.openActiveChatHead)
// router.route('/user/closeActiveChatHead').put(requireAuth, userController.closeActiveChatHead)

//router.route('/visitor/signup').post(userController.validateVisitorSignUp(), userController.visitorSignUp)
router.route('/signup')
    //.post(multerSaveTo('users').fields(images), parseObject(['subCategories'])  , userController.validateUserCreateBody(), userController.userSignUp);
    .post( userController.validateUserCreateBody(), userController.userSignUp);


router.put( '/updateToken', userController.validateUpdateToken(), userController.updateToken);

router.post('/user/addUser', userController.validateAddUser(), userController.addUser);

router.post('/signin', userController.validateUserSignin(), userController.signIn);
router.post('/verify-signin', userController.validateVerifySign(), userController.verifySignIn);
router.route('/verify-phone').put(userController.validateVerifyPhone(), userController.verifyPhone)
router.route('/resend-code').post(userController.validateResendCode(), userController.resendCode)
router.route('/user/group')
  .get(requireAuth, userController.getUserGroup)
  .post(requireAuth, userController.validateUserGroup(), userController.userGroup)
  .delete(requireAuth, userController.delUserGroup);
  router.route('/user/all').get(requireAuth, userController.getUsers);
  router.post('/user/upload', requireAuth, userController.upload);
  router.get('/getfile', userController.getFile);



export default router;
