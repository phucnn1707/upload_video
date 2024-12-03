// services/textScriptService.js
const db = require('../models');
const { TextScript, Keyword } = db;

class TextScriptService {
  // Create a new TextScript
  static async createTextScript(data) {
    try {
      return await TextScript.create(data);
    } catch (error) {
      throw new Error('Failed to create TextScript: ' + error.message);
    }
  }

  // Get all TextScripts
  static async getAllTextScripts() {
    try {
      return await TextScript.findAll({
        include: [
          {
            model: Keyword,
            as: 'keyword',
            attributes: ['keyword'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      throw new Error('Failed to retrieve TextScripts: ' + error.message);
    }
  }

  // Get a TextScript by ID
  static async getTextScriptById(id) {
    try {
      return await TextScript.findByPk(id);
    } catch (error) {
      throw new Error('Failed to retrieve TextScript: ' + error.message);
    }
  }

  // Update a TextScript by ID
  static async updateTextScript(id, data) {
    try {
      const textScript = await TextScript.findByPk(id);
      if (!textScript) return null;
      return await textScript.update(data);
    } catch (error) {
      throw new Error('Failed to update TextScript: ' + error.message);
    }
  }

  // Delete a TextScript by ID
  static async deleteTextScript(id) {
    try {
      const result = await TextScript.destroy({ where: { script_id: id } });
      return result > 0;
    } catch (error) {
      throw new Error('Failed to delete TextScript: ' + error.message);
    }
  }
}

module.exports = TextScriptService;
