const apiKeyService = require('../services/apiKeyService');

const createApiKey = async (req, res) => {
  const { service_name, api_key } = req.body;

  try {
    const apiKey = await apiKeyService.createApiKey(service_name, api_key);
    res.status(201).json({ success: true, message: 'API Key created successfully', data: apiKey });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllApiKeys = async (req, res) => {
  try {
    const apiKeys = await apiKeyService.getAllApiKeys();
    res.status(200).json({ success: true, data: apiKeys });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch API keys' });
  }
};

const getApiKeyByServiceName = async (req, res) => {
  const { serviceName } = req.params;

  try {
    const apiKey = await apiKeyService.getApiKeyByServiceName(serviceName);

    if (!apiKey) {
      return res.status(404).json({ success: false, message: `API Key for service '${serviceName}' not found` });
    }

    return res.status(200).json({ success: true, data: apiKey });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateApiKeyByServiceName = async (req, res) => {
  const { serviceName } = req.params;
  const { apiKey } = req.body;

  try {
    const updatedApiKey = await apiKeyService.updateApiKeyByServiceName(serviceName, apiKey);
    return res.status(200).json({
      success: true,
      message: 'API Key updated successfully',
      data: updatedApiKey,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createApiKey, getAllApiKeys, getApiKeyByServiceName, updateApiKeyByServiceName };
