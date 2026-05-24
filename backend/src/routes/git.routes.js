import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

import { addFiles } from '../controllers/add.js';
import { commitChanges } from '../controllers/commit.js';
import { initializeRepository } from '../controllers/init.js';
import { pullRepository } from '../controllers/pull.js';
import { pushRepository } from '../controllers/push.js';
import { revertCommit } from '../controllers/revert.js';

const router = express.Router();

router.post('/init', protect, initializeRepository);

router.post('/add', protect, addFiles);

router.post('/commit', protect, commitChanges);

router.post('/pull', protect, pullRepository);

router.post('/push', protect, pushRepository);

router.post('/revert', protect, revertCommit);

export default router;
