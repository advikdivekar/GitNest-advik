import express from 'express';
import {
    createRepository,
    getRepository,
    getUserRepositories,
    updateRepository,
    deleteRepository,
    starRepository,
    forkRepository,
} from '../controllers/repository.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:username', getUserRepositories);
router.get('/:username/:reponame', getRepository);
router.post('/', protect, createRepository);
router.put('/:username/:reponame', protect, updateRepository);
router.delete('/:username/:reponame', protect, deleteRepository);
router.post('/:username/:reponame/star', protect, starRepository);
router.post('/:username/:reponame/fork', protect, forkRepository);

export default router;