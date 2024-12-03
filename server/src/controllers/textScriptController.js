// controllers/textScriptController.js
const textScriptService = require('../services/textScriptService');

// Create a new TextScript
const createTextScript = async (req, res) => {
  const { keyword_id, generatedText, generatedTitle } = req.body;
  const user_id = req.user?.id;

  if (!user_id || !keyword_id || !generatedText || !generatedTitle) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: user_id, keyword_id, text_content, title',
      data: null,
    });
  }

  try {
    const newTextScript = {
      user_id,
      keyword_id,
      text_content: generatedText,
      title: generatedTitle,
    };

    const textScript = await textScriptService.createTextScript(newTextScript);
    res.status(201).json({
      success: true,
      message: 'TextScript created successfully',
      data: textScript,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// Get all TextScripts
const getTextScripts = async (req, res) => {
  try {
    const textScripts = await textScriptService.getAllTextScripts();
    res.status(200).json({ success: true, message: 'TextScripts retrieved successfully', data: textScripts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

// Get a TextScript by ID
const getTextScriptById = async (req, res) => {
  try {
    const textScript = await textScriptService.getTextScriptById(req.params.id);
    if (!textScript) {
      return res.status(404).json({ success: false, message: 'TextScript not found', data: null });
    }
    res.status(200).json({ success: true, message: 'TextScript retrieved successfully', data: textScript });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

// Update a TextScript by ID
const updateTextScript = async (req, res) => {
  try {
    const textScript = await textScriptService.updateTextScript(req.params.id, req.body);
    if (!textScript) {
      return res.status(404).json({ success: false, message: 'TextScript not found', data: null });
    }
    res.status(200).json({ success: true, message: 'TextScript updated successfully', data: textScript });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

// Delete a TextScript by ID
const deleteTextScript = async (req, res) => {
  try {
    const result = await textScriptService.deleteTextScript(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'TextScript not found', data: null });
    }
    res.status(200).json({ success: true, message: 'TextScript deleted successfully', data: null });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

module.exports = {
  createTextScript,
  getTextScripts,
  getTextScriptById,
  updateTextScript,
  deleteTextScript,
};
