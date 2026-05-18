import express from 'express';
import { getUserProfile, updateProfile, followUser, unfollowUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.get('/:username', getUserProfile);
router.post('/:username/follow', protect, followUser);
router.delete('/:username/follow', protect, unfollowUser);

export default router;
