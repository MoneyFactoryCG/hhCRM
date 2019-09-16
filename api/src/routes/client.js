import express from 'express';
import passport from 'passport';
import controllers from '../controllers';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllers.client.getAll,
);

router.get(
  '/:company_id',
  passport.authenticate('jwt', { session: false }),
  controllers.client.getAll,
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controllers.client.getById,
);
router.post(
  '/:company_id',
  passport.authenticate('jwt', { session: false }),
  controllers.client.add,
);
router.patch(
  '/:company_id/:id',
  passport.authenticate('jwt', { session: false }),
  controllers.client.update,
);
router.patch(
  '/:company_id/:id/addPhone',
  passport.authenticate('jwt', { session: false }),
  controllers.client.addPhone,
);

export default router;
