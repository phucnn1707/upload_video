const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { getSubtitle, updateSubtitle } = require('../controllers/subtitleController');

const router = express.Router();

router.get('/', authMiddleware, getSubtitle);
router.post('/', authMiddleware, updateSubtitle);

module.exports = router;
