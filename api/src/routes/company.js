import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/', controllers.company.getAll);
router.get('/:id', controllers.company.getById);
router.post('/', controllers.company.add);
router.patch('/:id', controllers.company.update);

export default router;
