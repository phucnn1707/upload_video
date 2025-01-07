const db = require('../models');
const { ApiKey } = db;

const createApiKey = async (serviceName, apiKey) => {
  if (!serviceName) {
    throw new Error('Service name is required');
  }

  if (!apiKey) {
    throw new Error('API key is required');
  }

  return await ApiKey.create({ service_name: serviceName, api_key: apiKey });
};

const getAllApiKeys = async () => {
  return await ApiKey.findAll({
    attributes: ['id', 'service_name', 'api_key', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'ASC']],
  });
};

const getApiKeyByServiceName = async (serviceName) => {
  return await ApiKey.findOne({
    where: { service_name: serviceName },
    attributes: ['id', 'service_name', 'api_key', 'createdAt', 'updatedAt'],
  });
};

const updateApiKeyByServiceName = async (serviceName, apiKey) => {
  if (!serviceName || !apiKey) {
    throw new Error('Service name and API Key are required');
  }

  const [updatedRowsCount, updatedRows] = await ApiKey.update(
    { api_key: apiKey },
    {
      where: { service_name: serviceName },
      returning: true,
      plain: true,
    }
  );

  if (updatedRowsCount === 0) {
    throw new Error('Service name not found');
  }

  return updatedRows;
};

module.exports = { createApiKey, getAllApiKeys, getApiKeyByServiceName, updateApiKeyByServiceName };
