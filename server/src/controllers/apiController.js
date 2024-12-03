const testApi = (req, res, next) => {
  return res.status(200).json({
    message: 'ok',
    data: 'test api',
  });
};

const handleGetAllUsers = (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({
      EM: 'error from server', //error message
      EC: '-1', //error code
      DT: '', //date
    });
  }
};

module.exports = {
  testApi,
};
