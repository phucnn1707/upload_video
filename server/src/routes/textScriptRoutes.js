const express = require('express');
const {
  createTextScript,
  getTextScripts,
  getTextScriptById,
  updateTextScript,
  deleteTextScript,
} = require('../controllers/textScriptController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// TextScript CRUD Routes
router.post('/', authMiddleware, createTextScript); // Create a new text script
router.get('/', authMiddleware, getTextScripts); // Get all text scripts
router.get('/:id', authMiddleware, getTextScriptById); // Get a text script by ID
router.put('/:id', authMiddleware, updateTextScript); // Update a text script by ID
router.delete('/:id', authMiddleware, deleteTextScript); // Delete a text script by ID

module.exports = router;
