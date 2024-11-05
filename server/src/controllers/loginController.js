const { login } = require('../services/loginService');

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call loginService to authenticate the user
    const result = await login(email, password);

    // Respond with the result from the service
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        token: result.token,
        user: result.user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Error in loginController:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login',
    });
  }
};

module.exports = { handleLogin };
