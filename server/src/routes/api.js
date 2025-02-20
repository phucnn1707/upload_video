const express = require('express');
const authRoutes = require('./authRoutes');
const trendRoutes = require('./trendRoutes');
const keywordRoutes = require('./keywordRoutes');
const textScriptRoutes = require('./textScriptRoutes');
const videoRoutes = require('./videoRoutes');
const generateRoutes = require('./generateRoutes');
const avatarRoutes = require('./avatarRoutes');
const linkedAccountRoutes = require('./linkedAccountRoutes');
const youtubeRoutes = require('./youtubeRoutes');
const apiKeyRoutes = require('./apiKeyRoutes');
const subRoutes = require('./subRoutes');

/**
 * Initializes all API routes with modular grouping under /api/v1.
 *
 * @param {object} app - The Express app instance
 */
const initApiRoutes = (app) => {
  const apiRouter = express.Router(); // Create a sub-router for /api/v1

  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/trends', trendRoutes);
  apiRouter.use('/keywords', keywordRoutes);
  apiRouter.use('/text-scripts', textScriptRoutes);
  apiRouter.use('/videos', videoRoutes);
  apiRouter.use('/generate', generateRoutes);
  apiRouter.use('/avatars', avatarRoutes);
  apiRouter.use('/linked-accounts', linkedAccountRoutes);
  apiRouter.use('/youtube', youtubeRoutes);
  apiRouter.use('/apikeys', apiKeyRoutes);
  apiRouter.use('/subtitle', subRoutes);

  app.use('/api/v1', apiRouter); // Apply the grouped router to /api/v1

  return app;
};

module.exports = initApiRoutes;
